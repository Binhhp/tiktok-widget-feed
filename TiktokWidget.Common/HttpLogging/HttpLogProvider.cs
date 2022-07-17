using TiktokWidget.Common.Constants;
using TiktokWidget.Common.HttpLogging.Handlers;
using TiktokWidget.Common.HttpLogging.Models;
using Microsoft.AspNetCore.Mvc.Controllers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mime;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Diagnostics;

namespace TiktokWidget.Common.HttpLogging
{
    public class HttpLogProvider : IHttpLogProvider
    {
        private readonly IHttpRequestLogHandler _requestHandler;
        private readonly IHttpResponseLogHandler _responseHandler;
        private readonly ILogger<HttpLogProvider> _logger;
        public HttpLogProvider(ILogger<HttpLogProvider> logger)
        {
            _requestHandler = new DefaultHttpRequestLogHandler();
            _responseHandler = new DefaultHttpResponseLogHandler();
            _logger = logger;
        }

        public async ValueTask LogAsync(HttpContext context, CancellationToken cancellationToken = default)
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
                var responseLog = await _responseHandler.Handle(context.Response);
                responseLog += $" Controller: {controllerName}, Action: {actionName}";
                logMessage = string.Format(InfoMessage.End, responseLog);
            }
            else
            {
                var requestLog = await _requestHandler.Handle(context.Request);
                requestLog += $" Controller: {controllerName}, Action: {actionName}";
                logMessage = string.Format(InfoMessage.Start, requestLog);
            }

            _logger.LogInformation(logMessage);
        }

        public async ValueTask LogAsync(HttpContext context, Exception exception, CancellationToken cancellationToken = default)
        {
            context.Response.ContentType = MediaTypeNames.Application.Json;
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            var errorDetails = new List<ErrorDetail>();
            var responseBase = new ErrorResponse()
            {
                StatusCode = (int)HttpStatusCode.InternalServerError
            };
            var contextFeature = context.Features.Get<IExceptionHandlerFeature>();

            if (contextFeature != null)
            {
                errorDetails.Add(new ErrorDetail
                {
                    ErrorCode = ResponseCode.Conflict,
                    ErrorMessage = contextFeature.Error.ToString()
                });
            }
            else
            {
                errorDetails.Add(new ErrorDetail
                {
                    ErrorCode = ResponseCode.InternalServerError,
                    ErrorMessage = exception.Message
                });
            }
            responseBase.Errors = errorDetails;
            var response = JsonConvert.SerializeObject(responseBase, Formatting.Indented);
            await context.Response.WriteAsync(response);
        }

        public async ValueTask LogAsync(Exception exception, CancellationToken cancellationToken = default)
        {
            try
            {
                _logger.LogInformation(HttpStatusCode.BadRequest.ToString());
                _logger.LogInformation(exception.Message + Environment.NewLine + exception.StackTrace);
            }
            catch (Exception)
            {
            }
        }
    }
}
