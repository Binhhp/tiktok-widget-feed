using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace TiktokWidget.Common.HttpLogging.Handlers
{
    public class DefaultHttpResponseLogHandler : IHttpResponseLogHandler
    {
        public readonly IHttpLogMessageFactory _loggerFactory;

        public DefaultHttpResponseLogHandler()
        {
            _loggerFactory = new HttpLogMessageFactory();
        }

        public async ValueTask<string> Handle(HttpResponse response, CancellationToken cancellationToken = default)
        {
            if (response == null) throw new NullReferenceException();

            HttpResponseLog logMessage = _loggerFactory.Create(response);
            string log = $"Status Code: {logMessage.StatusCode},";
            if (!string.IsNullOrEmpty(logMessage.ContentType)) log += $" Content-Type: {logMessage.ContentType}, ";
            return log;
        }
    }
}
