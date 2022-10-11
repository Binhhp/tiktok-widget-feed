using Newtonsoft.Json;
using System;
using System.IO;
using TiktokWidget.Common.Constants;
using TiktokWidget.Common.HttpLogging.Models;

namespace TiktokWidget.Service.BusinessExceptions
{
    [Serializable]
    public abstract class BusinessExceptionBase : IOException
    {
        public BusinessExceptionBase()
        {
        }
        public BusinessExceptionBase(string message, ResponseCode code) : base(JsonConvert.SerializeObject(new ErrorDetail(message, code)))
        {
        }
    }
}
