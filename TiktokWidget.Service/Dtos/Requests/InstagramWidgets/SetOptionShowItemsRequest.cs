using System.Collections.Generic;

namespace TiktokWidget.Service.Dtos.Requests.InstagramWidgets
{
    public class SetOptionShowItemsInstagramRequest
    {
        public IEnumerable<string> DisableShowItems { get; set; }
        public IEnumerable<string> ItemSorts { get; set; }
        public bool DisableTopNewItems { get; set; }
    }
}
