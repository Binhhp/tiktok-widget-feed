using System;
using System.Collections.Generic;
using TiktokWidget.Common.Enums;
using TiktokWidget.Common.Utils;

namespace TiktokWidget.Service.Entities
{
    public class PerformancesEntity : BaseEntity<string>
    {
        [NonFormater]
        public DateTime Time { get; set; }
        public Int64 Impression { get; set; }
        public List<string> ClickPosts { get; set; }
        public PerformanceTypeEnum Type { get; set; }
        public string WidgetId { get; set; }
        public int ShopId { get; set; }
    }
}
