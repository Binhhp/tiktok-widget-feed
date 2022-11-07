using System;

namespace TiktokWidget.Service.Entities
{
    public class PerformancesEntity : BaseEntity<string>
    {
        public DateTime Time { get; set; }
        public Int64 InstagramTraffic { get; set; }
        public Int64 InstagramClicks { get; set; }
        public Int64 TikTokTraffic { get; set; }
        public Int64 TikTokClicks { get; set; }
        public int ShopId { get; set; }
        public ShopEntity Shops { get; set; }
    }
}
