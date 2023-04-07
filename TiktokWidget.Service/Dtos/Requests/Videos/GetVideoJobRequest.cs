using TiktokWidget.Common.Enums;

namespace TiktokWidget.Service.Dtos.Requests.Videos
{
    public class GetVideoJobRequest
    {
        public string Data { get; set; }
        public SourceTypeEnum Type { get; set; }
    }
}
