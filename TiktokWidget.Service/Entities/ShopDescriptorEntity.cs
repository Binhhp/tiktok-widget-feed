namespace TiktokWidget.Service.Entities
{
    public class ShopDescriptorEntity : BaseEntity<string>
    {
        public string Feedback { get; set; }
        public FeedbackEnum? FeedbackStatus { get; set; }
        public string ShopOwner { get; set; }
        public int ShopId { get; set; } 
        public ShopEntity Shops { get; set; }
    }

    public enum FeedbackEnum
    {
        Good,
        Bad
    }
}
