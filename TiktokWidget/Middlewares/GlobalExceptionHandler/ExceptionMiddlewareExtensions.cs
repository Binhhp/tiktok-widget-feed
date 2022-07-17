using Microsoft.AspNetCore.Builder;

namespace TiktokWidget.Middlewares.GlobalExceptionHandler
{
    public static class ExceptionMiddlewareExtensions
    {
        public static void GlobalExceptionMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionMiddleware>();
        }
    }
}
