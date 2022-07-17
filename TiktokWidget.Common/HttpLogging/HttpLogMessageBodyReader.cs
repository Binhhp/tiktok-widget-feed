
using System.IO;
using System.Threading.Tasks;

namespace TiktokWidget.Common.HttpLogging
{
    public class HttpLogMessageBodyReader
    {
        public async ValueTask<string> ReadAsync(Stream body)
        {
            using (var reader = new MemoryStream())
            {
                await body.CopyToAsync(reader);
                reader.Seek(0, SeekOrigin.Begin);
                var requestBodyText = new StreamReader(reader).ReadToEnd();
                reader.Seek(0, SeekOrigin.Begin);
                return requestBodyText;
            }
        }
    }
}
