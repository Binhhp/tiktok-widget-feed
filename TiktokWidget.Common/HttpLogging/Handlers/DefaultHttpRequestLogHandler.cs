using Microsoft.AspNetCore.Http;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace TiktokWidget.Common.HttpLogging.Handlers
{
    public class DefaultHttpRequestLogHandler : IHttpRequestLogHandler
    {
        private readonly IHttpLogMessageFactory _loggerFactory;

        public DefaultHttpRequestLogHandler()
        {
            _loggerFactory = new HttpLogMessageFactory();
        }

        public async ValueTask<string> Handle(HttpRequest request, CancellationToken cancellationToken = default)
        {
            if(request == null) throw new NullReferenceException();

            HttpRequestLog logMessage = _loggerFactory.Create(request);
            string log = $"Method: {logMessage.Method}, Url: {logMessage.Url.Absolute},";
            if (!string.IsNullOrEmpty(logMessage.ContentType)) log += $" Content-Type: {logMessage.ContentType}, ";
            return log;
        }
    }
}
