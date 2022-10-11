using System;
using TiktokWidget.Common.Constants;

namespace TiktokWidget.Service.BusinessExceptions
{
    [Serializable]
    public class ConflictException : BusinessExceptionBase
    {
        public ConflictException() : base(String.Format(ErrorMessage.Conflict, "Input"), ResponseCode.Conflict)
        {
        }
        public ConflictException(string name) : base(String.Format(ErrorMessage.Conflict, name), ResponseCode.Conflict)
        {
        }
    }
}
