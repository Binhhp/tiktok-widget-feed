using Newtonsoft.Json;
using System.Collections.Generic;
using TiktokWidget.Common.Constants;

namespace TiktokWidget.Common.HttpLogging.Models
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
