using Microsoft.AspNetCore.Http;
using System.Threading;

namespace TiktokWidget.Common.HttpLogging.Handlers
{
    public interface IHttpResponseLogHandler
    {
        string Handle(HttpResponse response, CancellationToken cancellationToken = default);
    }
}
