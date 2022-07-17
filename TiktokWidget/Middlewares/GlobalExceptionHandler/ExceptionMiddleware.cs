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
                //Log request
                await _logProvider.LogAsync(httpContext);
                await _next(httpContext);
                //Log response
                await _logProvider.LogAsync(httpContext);
            }
            catch (Exception ex)
            {
                //Log exception and return response
                await _logProvider.LogAsync(ex);
                await _logProvider.LogAsync(httpContext, ex);
            }
        }
    }
}
