using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;
using TiktokWidget.Common.Constants;

namespace TiktokWidget.Common.HttpLogging.Models
{
    public class ErrorResponse
    {
        public int StatusCode { get; set; } = (int)ResponseCode.Success;
        public IEnumerable<ErrorDetail> Errors { get; set; }
    }
}
