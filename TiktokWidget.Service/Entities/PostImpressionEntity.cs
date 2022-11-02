using System;

namespace TiktokWidget.Service.Entities
{
    public class PostImpressionEntity : BaseEntity<string>
    {
        public DateTime Time { get; set; }
        public Int64 Impression { get; set; }
        public Int64 Clicks { get; set; }
        public string PostId { get; set; }
        public PostsEntity Post { get; set; }
    }
}
