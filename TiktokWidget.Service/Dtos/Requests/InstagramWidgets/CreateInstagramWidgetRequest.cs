using TiktokWidget.Common.Enums;

namespace TiktokWidget.Service.Dtos.Requests.InstagramWidgets
{
    public class CreateInstagramWidgetRequest
    {
        public string WidgetTitle { get; set; }
        public SourceTypeEnum SourceType { get; set; }
        public string ValueSource { get; set; }
        public Header Header { get; set; }
        public Optional Options { get; set; }
    }

    public class Header
    {
        public bool Enable { get; set; }
        public string Title { get; set; }
    }

    public class Optional
    {
        public int LayoutType { get; set; }
        public string LabelReadMore { get; set; }
        public string LabelLoadMore { get; set; }
        public bool ShowNetworkIcon { get; set; }
        public string LoadMoreBackGround { get; set; }
        public string ItemBackGround { get; set; }
        public string ItemColor { get; set; }
        public int NumberPerRow { get; set; }
        public int LimitItems { get; set; }
    }
}
