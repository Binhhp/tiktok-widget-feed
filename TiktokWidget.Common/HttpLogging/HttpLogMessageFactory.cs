using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using System;

namespace TiktokWidget.Common.HttpLogging
{
    public class HttpLogMessageFactory : IHttpLogMessageFactory
    {
        public HttpRequestLog Create(HttpRequest request)
        {
            var uri = new Uri(request.GetDisplayUrl());
            var url = new UrlLog(uri.Port, uri.AbsolutePath, uri.Host, uri.Scheme);
            return new HttpRequestLog(url, request.Method, request.ContentType);
        }

        public HttpResponseLog Create(HttpResponse response)
        {
            return new HttpResponseLog(response.StatusCode, response.ContentType);
        }
    }
}
