using Newtonsoft.Json;
using Orichi.IoC.Constants;
using System.Collections.Generic;

namespace Orichi.IoC.Logging.Models.Models
{
    public class ErrorResponse
    {
        [JsonProperty("statusCode")]
        public int StatusCode { get; set; }
        [JsonProperty("errors")]
        public IEnumerable<ErrorDetail> Errors { get; set; }

        public ErrorResponse()
        {
            StatusCode = (int)ResponseCode.Success;
        }
    }
}
