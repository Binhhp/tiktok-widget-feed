using System.Collections.Generic;

namespace TiktokWidget.Common.HttpLogging
{
    public class HttpResponseLog
    {
        public HttpResponseLog(int statusCode, string contentType)
        {
            StatusCode = statusCode;
            ContentType = contentType;
        }

        public int StatusCode { get; }

        public object Body { get; set; }

        public string ContentType { get; }

        public List<KeyValuePair<string, string>> Headers { get; }

        internal void SetBody(object body)
        {
            Body = body;
        }
    }
}