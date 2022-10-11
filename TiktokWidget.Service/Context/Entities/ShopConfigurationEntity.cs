using System;

using TiktokWidget.Common.Enums;

namespace TiktokWidget.Service.Entities
{
    public class ShopConfigurationEntity : BaseEntity<string>
    {
        public int ShopId { get; set; }
        public string Timezone { get; set; }
        public bool IsEnabled { get; set; }
        public ButtonPositionEnum ButtonPosition { get; set; }
        public string Image { get; set; }
        public string TikTokUserName { get; set; }
        public string Theme { get; set; }
        public ShopEntity Shops { get;set; }
    }
}
