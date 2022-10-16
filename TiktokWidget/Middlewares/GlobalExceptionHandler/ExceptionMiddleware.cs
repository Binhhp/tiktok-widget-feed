using Microsoft.AspNetCore.Http;
using Orichi.IoC.Logging;
using System;
using System.Threading.Tasks;

namespace TiktokWidget.Middlewares.GlobalExceptionHandler
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILoggerProvider _logProvider;
        public ExceptionMiddleware(RequestDelegate next, ILoggerProvider logProvider)
        {
            _next = next;
            _logProvider = logProvider;
        }
        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                _logProvider.LogException(httpContext, ex);
            }
        }
    }
}
