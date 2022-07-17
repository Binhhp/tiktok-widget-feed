using Microsoft.AspNetCore.Http;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace TiktokWidget.Common.HttpLogging
{
    /// <summary>
    /// Interface handler log http
    /// </summary>
    public interface IHttpLogProvider
    {
        /// <summary>
        /// Log debug request and response http
        /// </summary>
        /// <param name="context">HTTP-specific information about a single HTTP request</param>
        /// <param name="cancellationToken">Token cancel</param>
        ValueTask LogAsync(HttpContext context, CancellationToken cancellationToken = default);
        /// <summary>
        /// Handler exception and return response Bad Request with errors
        /// </summary>
        /// <param name="context">HTTP-specific information about a single HTTP request</param>
        /// <param name="exception">Exception error</param>
        /// <param name="cancellationToken">Token cancel</param>
        /// <returns>Response Bad Request with Errors</returns>
        ValueTask LogAsync(HttpContext context, Exception exception, CancellationToken cancellationToken = default);
        /// <summary>
        /// Log exception
        /// </summary>
        /// <param name="exception">Exception</param>
        /// <param name="cancellationToken">Token cancel</param>
        ValueTask LogAsync(Exception exception, CancellationToken cancellationToken = default);
    }
}
