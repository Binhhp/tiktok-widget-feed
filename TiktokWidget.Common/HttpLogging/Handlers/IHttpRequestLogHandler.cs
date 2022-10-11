using Microsoft.AspNetCore.Http;
using System.Threading;

namespace TiktokWidget.Common.HttpLogging.Handlers
{
    public interface IHttpRequestLogHandler
    {
        string Handle(HttpRequest request, CancellationToken cancellationToken = default);
    }
}
