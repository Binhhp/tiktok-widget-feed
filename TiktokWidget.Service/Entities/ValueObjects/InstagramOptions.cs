using System.ComponentModel.DataAnnotations;

namespace TiktokWidget.Service.Entities.ValueObjects
{
    public class InstagramOptions
    {
        public int LayoutType { get; set; }
        [MaxLength(155)]
        public string LabelReadMore { get; set; }
        [MaxLength(155)]
        public string LabelLoadMore { get; set; }
        public bool ShowNetworkIcon { get; set; }
        public string LoadMoreBackGround { get; set; }
        [MaxLength(18)]
        public string ItemBackGround { get; set; }
        [MaxLength(18)]
        public string ItemColor { get; set; }
        public int NumberPerRow { get; set; }
        public int LimitItems { get; set; }
        public virtual InstagramWidgetEntity InstagramWidget { get; set; }
    }
}
