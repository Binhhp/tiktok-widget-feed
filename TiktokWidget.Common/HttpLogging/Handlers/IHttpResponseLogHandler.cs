using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace TiktokWidget.Common.HttpLogging.Handlers
{
    public interface IHttpResponseLogHandler
    {
        ValueTask<string> Handle(HttpResponse response, CancellationToken cancellationToken = default);
    }
}
