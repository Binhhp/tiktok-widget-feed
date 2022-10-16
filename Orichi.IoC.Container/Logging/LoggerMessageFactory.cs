using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using System;

namespace Orichi.IoC.Logging
{
    public class LoggerMessageFactory : ILoggerMessageFactory
    {
        public LoggerRequest Create(HttpRequest request)
        {
            var uri = new Uri(request.GetDisplayUrl());
            var url = new UrlLog(uri.Port, uri.AbsolutePath, uri.Host, uri.Scheme);
            return new LoggerRequest(url, request.Method, request.ContentType);
        }

        public LoggerResponse Create(HttpResponse response)
        {
            return new LoggerResponse(response.StatusCode, response.ContentType);
        }
    }
}
