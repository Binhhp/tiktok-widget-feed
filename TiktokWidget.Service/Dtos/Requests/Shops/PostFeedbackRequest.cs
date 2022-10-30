using TiktokWidget.Service.Entities;

namespace TiktokWidget.Service.Dtos.Requests.Shops
{
    public class PostFeedbackRequest
    {
        public string Feedback { get; set; }
        public FeedbackEnum Status { get; set; }
    }
}
