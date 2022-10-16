using Microsoft.AspNetCore.Http;
using System.Threading;

namespace Orichi.IoC.Logging.Handlers
{
    public interface ILoggerRequestHandler
    {
        string Handle(HttpRequest request, CancellationToken cancellationToken = default);
    }
}
