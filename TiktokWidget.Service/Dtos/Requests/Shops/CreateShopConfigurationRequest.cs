using TiktokWidget.Common.Enums;

namespace TiktokWidget.Service.Dtos.Requests.Shops
{
    public class CreateShopConfigurationRequest
    {
        public string Image { get; set; }
        public ButtonPositionEnum ButtonPosition { get; set; }
        public string Theme { get; set; }
        public string TikTokUserName { get; set; }
        public bool IsEnabled { get; set; }
    }
}
