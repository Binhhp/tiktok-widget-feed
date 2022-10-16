using Microsoft.AspNetCore.Http;
using System;
using System.Threading;

namespace Orichi.IoC.Logging.Handlers
{
    public class DefaultLoggerRequestHandler : ILoggerRequestHandler
    {
        private readonly ILoggerMessageFactory _loggerFactory;

        public DefaultLoggerRequestHandler()
        {
            _loggerFactory = new LoggerMessageFactory();
        }

        public string Handle(HttpRequest request, CancellationToken cancellationToken = default)
        {
            if(request == null) throw new NullReferenceException();

            LoggerRequest logMessage = _loggerFactory.Create(request);
            string log = $"Method: {logMessage.Method}, Url: {logMessage.Url.Absolute},";
            if (!string.IsNullOrEmpty(logMessage.ContentType)) log += $" Content-Type: {logMessage.ContentType}, ";
            return log;
        }
    }
}
