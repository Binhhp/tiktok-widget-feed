using TiktokWidget.Common.Enums;

namespace TiktokWidget.Service.Dtos.Requests.TikTokWidgets
{
    public class GetVideoByJobRequest
    {
        public string Data { get; set; }
        public SourceTypeEnum Type { get; set; }
    }
}
