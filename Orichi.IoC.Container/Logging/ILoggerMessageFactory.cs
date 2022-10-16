using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace Orichi.IoC.Logging
{
    /// <summary>
    /// Log message request and response
    /// </summary>
    public interface ILoggerMessageFactory
    {
        /// <summary>
        /// Create log request
        /// </summary>
        /// <param name="request">Http request</param>
        /// <returns>Information of request</returns>
        LoggerRequest Create(HttpRequest request);
        /// <summary>
        /// Create log response
        /// </summary>
        /// <param name="response">Http response</param>
        /// <returns>Information of response</returns>
        LoggerResponse Create(HttpResponse response);
    }
}
