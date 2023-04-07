using System.Collections.Generic;

namespace TiktokWidget.Service.Dtos.Requests.TikTokWidgets
{
    public class SetOptionShowItemsTiktokRequest
    {
        public IEnumerable<string> DisableShowItems { get; set; }
        public IEnumerable<string> ItemSorts { get; set; }
        public bool DisableTopNewItems { get; set; }
    }
}
