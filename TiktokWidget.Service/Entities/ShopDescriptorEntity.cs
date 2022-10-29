namespace TiktokWidget.Service.Entities
{
    public class ShopDescriptorEntity : BaseEntity<string>
    {
        public string Feedback { get; set; }
        public int ShopId { get; set; } 
        public ShopEntity Shops { get; set; }
    }
}
