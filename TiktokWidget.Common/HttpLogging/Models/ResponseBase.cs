using Newtonsoft.Json;

namespace TiktokWidget.Common.HttpLogging.Models
{
    public class ResponseBase : ErrorResponse
    {
        [JsonProperty("success")]
        public bool Success { get; set; }

        public ResponseBase()
        {
            Success = true;
        }
    }
}
