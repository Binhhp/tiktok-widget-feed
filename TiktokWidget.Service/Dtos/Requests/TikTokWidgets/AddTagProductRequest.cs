using System.Collections.Generic;
using TiktokWidget.Service.Dtos.Request;
using TiktokWidget.Service.Entities;

namespace TiktokWidget.Service.Dtos.Requests.TikTokWidgets
{
    public class AddTagProductRequest : RequestBase
    {
        public IEnumerable<ProductEntity> Products { get; set; }
    }
}
