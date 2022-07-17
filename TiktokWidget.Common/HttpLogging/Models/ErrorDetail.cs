using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;
using TiktokWidget.Common.Constants;

namespace TiktokWidget.Common.HttpLogging.Models
{
    public class ErrorDetail
    {
        public string ErrorMessage { get; set; }
        public ResponseCode ErrorCode { get; set; }
    }
}
