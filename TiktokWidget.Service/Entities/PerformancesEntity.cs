using System;
using TiktokWidget.Common.Enums;

namespace TiktokWidget.Service.Entities
{
    public class PerformancesEntity : BaseEntity<string>
    {
        public DateTime Time { get; set; }
        public Int64 Traffic { get; set; }
        public PerformanceTypeEnum Type { get; set; }
        public int ShopId { get; set; }
        public ShopEntity Shops { get; set; }
    }
}
