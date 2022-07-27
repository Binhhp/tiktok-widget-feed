using TiktokWidget.Common.Enums;

namespace TiktokWidget.Service.Dtos.Requests
{
    public class AddJobRequest
    {
        public string Data { get; set; }
        public SourceTypeEnum Type { get; set; }
    }
}
