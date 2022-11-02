using System;
using System.Collections.Generic;

namespace TiktokWidget.Service.Entities
{
    public class PostsEntity : BaseEntity<string>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public string Image { get; set; }
        public string Url { get; set; }
        public bool Status { get; set; }
        public DateTime CreatedTime { get; set; }
        public ICollection<PostImpressionEntity> Impression { get; set; }
    }
}
