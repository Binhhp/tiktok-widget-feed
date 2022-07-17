using System;

namespace TiktokWidget.Middlewares
{
    public class TikTokException : SystemException
    {
        public TikTokException(string message)
        {
            Message = message;
        }
        // mô tả lỗi 
        public override string Message { get; }
    }
}
