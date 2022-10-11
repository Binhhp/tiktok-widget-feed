using System.Collections.Generic;

namespace TiktokWidget.Common.HttpLogging
{
    public class HttpRequestLog
    {
        public HttpRequestLog(UrlLog url, string method, string contentType)
        {
            Url = url;
            Method = method;
            ContentType = contentType;
        }


        public UrlLog Url { get; }

        public string Method { get; }

        public object Body { get; set; }

        public string ContentType { get; }

        public IReadOnlyList<KeyValuePair<string, string>> Headers { get; set; }

        public IReadOnlyList<KeyValuePair<string, string>> Cookies { get; }

        internal void SetBody(object body)
        {
            Body = body;
        }
    }
}
