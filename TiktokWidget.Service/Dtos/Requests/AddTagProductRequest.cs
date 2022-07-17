using System.Collections.Generic;
using TiktokWidget.Service.Dtos.Request;

namespace TiktokWidget.Service.Dtos.Requests
{
    public class AddTagProductRequest : RequestBase
    {
        public IEnumerable<string> ProductIds { get; set; }
    }
}
