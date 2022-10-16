using Newtonsoft.Json;

namespace Orichi.IoC.Logging.Models.Models
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
