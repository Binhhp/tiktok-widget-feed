using TiktokWidget.Service.Entities;

namespace TiktokWidget.Service.Dtos.Responses.Shops
{
    public class PostFeedbackResponse
    {
        public string Feedback { get; set; }
        public FeedbackEnum? FeedbackStatus { get; set; }
        public string ShopOwner { get; set; }
        public int ShopId { get; set; }
    }
}
