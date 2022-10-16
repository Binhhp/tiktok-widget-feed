using Orichi.IoC.Constants;
using System;
using TiktokWidget.Common.Constants;

namespace TiktokWidget.Service.BusinessExceptions
{
    [Serializable]
    public class NotFoundException : BusinessExceptionBase
    {
        public NotFoundException() : base(string.Format(ErrorMessage.NotFound, "Data"), ResponseCode.NotFound)
        {
        }
        public NotFoundException(string name) : base(string.Format(ErrorMessage.NotFound, name), ResponseCode.NotFound)
        {
        }
    }
}
