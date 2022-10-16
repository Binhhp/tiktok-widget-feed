using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Orichi.IoC.Logging.Handlers
{
    public class DefaultLoggerResponseHandler : ILoggerResponseHandler
    {
        public readonly ILoggerMessageFactory _loggerFactory;

        public DefaultLoggerResponseHandler()
        {
            _loggerFactory = new LoggerMessageFactory();
        }

        public string Handle(HttpResponse response, CancellationToken cancellationToken = default)
        {
            if (response == null) throw new NullReferenceException();

            LoggerResponse logMessage = _loggerFactory.Create(response);
            string log = $"Status Code: {logMessage.StatusCode},";
            if (!string.IsNullOrEmpty(logMessage.ContentType)) log += $" Content-Type: {logMessage.ContentType}, ";
            return log;
        }
    }
}
