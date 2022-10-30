using System;

namespace TiktokWidget.Service.Entities
{
    public class CoursesEntity : BaseEntity<string>
    {
        public string Image { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public bool Status { get; set; }
        public string Ordering { get; set; }
        public DateTime CreatedTime { get; set; }
    }
}
