using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace TiktokWidget.Common.HttpLogging
{
    /// <summary>
    /// Log message request and response
    /// </summary>
    public interface IHttpLogMessageFactory
    {
        /// <summary>
        /// Create log request
        /// </summary>
        /// <param name="request">Http request</param>
        /// <returns>Information of request</returns>
        HttpRequestLog Create(HttpRequest request);
        /// <summary>
        /// Create log response
        /// </summary>
        /// <param name="response">Http response</param>
        /// <returns>Information of response</returns>
        HttpResponseLog Create(HttpResponse response);
    }
}
