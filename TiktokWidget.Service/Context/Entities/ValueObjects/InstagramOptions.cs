using System.ComponentModel.DataAnnotations;

namespace TiktokWidget.Service.Context.Entities.ValueObjects
{
    public class InstagramOptions
    {
        public int LayoutType { get; set; }
        [MaxLength(155)]
        public string LabelReadMore { get; set; }
        public bool ShowNetworkIcon { get; set; }
        [MaxLength(18)]
        public string BackGround { get; set; }
        [MaxLength(18)]
        public string Color { get; set; }
        public int NumberPerRow { get; set; }
        public int LimitItems { get; set; }
        public virtual InstagramWidgetEntity InstagramWidget { get; set; }
    }
}
