using Newtonsoft.Json;
using Orichi.IoC.Constants;

namespace Orichi.IoC.Logging.Models
{
    public class ErrorDetail
    {
        [JsonProperty("errorMessage")]
        public string ErrorMessage { get; set; }
        [JsonProperty("errorCode")]
        public ResponseCode ErrorCode { get; set; }

        public ErrorDetail()
        {
        }
        public ErrorDetail(string errorMessage, ResponseCode errorCode)
        {
            ErrorMessage = errorMessage;
            ErrorCode = errorCode;
        }
    }
}
