
using System.ComponentModel.DataAnnotations;

namespace TiktokWidget.Service.Entities.ValueObjects
{
    public class SettingValueObject
    {
        public int LayoutType { get; set; }
        [MaxLength(155)]
        public string LabelReadMore { get; set; }
        [MaxLength(155)]
        public string LabelViewMore { get; set; }
        public bool ShowProfile { get; set; }
        public bool ShowNetworkIcon { get; set; }
        [MaxLength(18)]
        public string AccentColor { get; set; }
        [MaxLength(18)]
        public string BackGround { get; set; }
        [MaxLength(18)]
        public string Color { get; set; }
        public int NumberPerRow { get; set; }
        public virtual WidgetEntity Widget { get; set; }

    }
}
