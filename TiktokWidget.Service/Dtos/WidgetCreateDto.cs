
using TiktokWidget.Common.Enums;

namespace TiktokWidget.Service.Dtos
{
    public class WidgetCreateDto
    {
        public string WidgetTitle { get; set; }
        public SourceTypeEnum SourceType { get; set; }
        public string ValueSource { get; set; }
        public string TagProduct { get; set; }

        #region Setting
        public int LayoutType { get; set; }
        public string LabelReadMore { get; set; }
        public string LabelViewMore { get; set; }
        public bool ShowProfile { get; set; }
        public bool ShowNetworkIcon { get; set; }
        public string AccentColor { get; set; }
        public string BackGround { get; set; }
        public string Color { get; set; }
        public int NumberPerRow { get; set; }
        #endregion

        #region Header
        public bool Enable { get; set; }
        public string Title { get; set; }
        public string Caption { get; set; }
        #endregion
    }
}
