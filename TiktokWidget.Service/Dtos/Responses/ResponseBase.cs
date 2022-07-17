using TiktokWidget.Common.HttpLogging.Models;

namespace TiktokWidget.Service.Dtos.Response
{
    public class ResponseBase : ErrorResponse
    {
        public bool Success { get; set; } = true;
    }
}
