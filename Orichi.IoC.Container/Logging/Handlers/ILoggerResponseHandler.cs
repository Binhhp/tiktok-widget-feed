using Microsoft.AspNetCore.Http;
using System.Threading;

namespace Orichi.IoC.Logging.Handlers
{
    public interface ILoggerResponseHandler
    {
        string Handle(HttpResponse response, CancellationToken cancellationToken = default);
    }
}
