using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace TiktokWidget.Common.HttpLogging.Handlers
{
    public interface IHttpRequestLogHandler
    {
        ValueTask<string> Handle(HttpRequest request, CancellationToken cancellationToken = default);
    }
}
