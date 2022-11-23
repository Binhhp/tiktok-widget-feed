using System;
using TiktokWidget.Common.Enums;
using TiktokWidget.Common.Utils;

namespace TiktokWidget.Service.Entities
{
    public class PostClickWidgetEntity : BaseEntity<string>
    {
        [NonFormater]
        public DateTime Time { get; set; }
        public int Click { get; set; }
        public PerformanceTypeEnum Type { get; set; }
        public string WidgetId { get; set; }
        public int ShopId { get; set; }
        public PostWidgetInformation PostInfo { get; set; }
    }

    public class PostWidgetInformation
    {
        public string Id { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
    }
}
