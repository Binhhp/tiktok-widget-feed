using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;
using TiktokWidget.Common.HttpLogging;

namespace TiktokWidget.Middlewares.GlobalExceptionHandler
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IHttpLogProvider _logProvider;
        public ExceptionMiddleware(RequestDelegate next, IHttpLogProvider logProvider)
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
