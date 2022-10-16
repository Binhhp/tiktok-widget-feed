using Microsoft.AspNetCore.Mvc.Controllers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mime;
using System.Threading;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Orichi.IoC.Logging.Handlers;
using Orichi.IoC.Constants;
using Orichi.IoC.Logging.Models;
using Orichi.IoC.Logging.Models.Models;

namespace Orichi.IoC.Logging
{
    public class LoggerProvider : ILoggerProvider
    {
        private readonly ILoggerRequestHandler _requestHandler;
        private readonly ILoggerResponseHandler _responseHandler;
        private readonly ILogger<LoggerProvider> _logger;
        public LoggerProvider(ILogger<LoggerProvider> logger)
        {
            _requestHandler = new DefaultLoggerRequestHandler();
            _responseHandler = new DefaultLoggerResponseHandler();
            _logger = logger;
        }

        public void LogRequest(HttpContext context, CancellationToken cancellationToken = default)
        {
            var endpoint = context.GetEndpoint();
            if (endpoint == null) throw new Exception("The requested URL was not found on this server");
            var controllerActionDescriptor = endpoint.Metadata.GetMetadata<ControllerActionDescriptor>();
            string controllerName = "", actionName = "", logMessage;

            if (controllerActionDescriptor != null)
            {
                controllerName = controllerActionDescriptor.ControllerName;
                actionName = controllerActionDescriptor.ActionName;
            }

            if (context.Response.HasStarted)
            {
                var responseLog = _responseHandler.Handle(context.Response);
                responseLog += $" Controller: {controllerName}, Action: {actionName}";
                logMessage = string.Format(InfoMessage.End, responseLog);
            }
            else
            {
                var requestLog = _requestHandler.Handle(context.Request);
                requestLog += $" Controller: {controllerName}, Action: {actionName}";
                logMessage = string.Format(InfoMessage.Start, requestLog);
            }

            _logger.LogInformation(logMessage);
        }

        public void LogException(HttpContext context, Exception exception, CancellationToken cancellationToken = default)
        {
            context.Response.ContentType = MediaTypeNames.Application.Json;
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            var errorDetails = new List<ErrorDetail>();
            var responseBase = new ResponseBase()
            {
                Success = false
            };
            try
            {
                var error = JsonConvert.DeserializeObject<ErrorDetail>(exception.Message);
                errorDetails.Add(new ErrorDetail
                {
                    ErrorCode = error.ErrorCode,
                    ErrorMessage = error.ErrorMessage
                });
                var statusCode = (int)MapStatusCode(error.ErrorCode);
                context.Response.StatusCode = statusCode;
                responseBase.StatusCode = statusCode;
            }
            catch
            {
                responseBase.StatusCode = (int)HttpStatusCode.InternalServerError;
                errorDetails.Add(new ErrorDetail
                {
                    ErrorCode = ResponseCode.InternalServerError,
                    ErrorMessage = exception.Message
                });
            }
            responseBase.Errors = errorDetails;
            var response = JsonConvert.SerializeObject(responseBase, Formatting.Indented);
            context.Response.WriteAsync(response).GetAwaiter().GetResult();
        }

        public void LogInfo(Exception exception, CancellationToken cancellationToken = default)
        {
            try
            {
                _logger.LogInformation(exception.Message + Environment.NewLine + exception.StackTrace);
            }
            catch (Exception)
            {
            }
        }
        public void LogDebug(Exception exception, CancellationToken cancellationToken = default)
        {
            try
            {
                _logger.LogDebug(exception.Message + Environment.NewLine + exception.StackTrace);
            }
            catch (Exception)
            {
            }
        }

        private HttpStatusCode MapStatusCode(ResponseCode code)
        {
            switch (code)
            {
                case ResponseCode.NotFound: return HttpStatusCode.NotFound;
                case ResponseCode.CannotDelete:
                case ResponseCode.Conflict: return HttpStatusCode.Conflict;
                case ResponseCode.BadRequest:
                case ResponseCode.RequireFieldNullEmpty:
                case ResponseCode.InvalidDataFormat:
                    return HttpStatusCode.BadRequest;
                case ResponseCode.InternalServerError: return HttpStatusCode.InternalServerError;
                default : return HttpStatusCode.OK;
            }
        }
    }
}
