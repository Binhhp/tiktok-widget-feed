using System.ComponentModel.DataAnnotations;

namespace TiktokWidget.Service.Entities.ValueObjects
{
    public class HeaderOptions
    {
        public bool Enable { get; set; }
        [MaxLength(155)]
        public string Title { get; set; }
        [MaxLength(255)]
        public string Caption { get; set; }
        public virtual TikTokWidgetEntity Widget { get; set; }
    }
}
