using TiktokWidget.Common.Enums;
using TiktokWidget.Service.Entities;

namespace TiktokWidget.Service.Dtos.Requests.Shops
{
    public class SetClickPostRequest
    {
        public string PostId { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
    }
    public class PostWidgetDto
    {
        public int ShopId { get; set; }
        public string WidgetId { get; set; }
        public PerformanceTypeEnum Type { get; set; }
        public PostWidgetInformation Information { get; set; }
    }
}
