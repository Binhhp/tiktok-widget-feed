using System;
using System.Collections.Generic;
using System.Text;

namespace TiktokWidget.Service.Dtos.Requests.Widget
{
    public class RemoveWidgetRequest
    {
        public IEnumerable<string> WidgetIds { get; set; }
    }
}
