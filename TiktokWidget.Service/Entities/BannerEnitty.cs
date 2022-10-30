namespace TiktokWidget.Service.Entities
{
    public class BannerEnitty : BaseEntity<string>
    {
        public string Image { get; set; }
        public string Url { get; set; }
        public bool Status { get; set; }
    }
}
