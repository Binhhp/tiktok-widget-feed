using Newtonsoft.Json;
using Orichi.IoC.Constants;
using Orichi.IoC.Logging.Models;
using System;
using System.IO;

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
