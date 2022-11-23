using System;
using TiktokWidget.Common.Enums;
using TiktokWidget.Common.Utils;

namespace TiktokWidget.Service.Entities
{
    public class ImpressionWidgetEntity : BaseEntity<string>
    {
        [NonFormater]
        public DateTime Time { get; set; }
        public Int64 Impression { get; set; }
        public PerformanceTypeEnum Type { get; set; }
        public string WidgetId { get; set; }
        public int ShopId { get; set; }
    }
}
