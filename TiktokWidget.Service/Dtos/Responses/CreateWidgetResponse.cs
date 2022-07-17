using System;
using System.Collections.Generic;
using System.Text;
using TiktokWidget.Service.Dtos.Response;

namespace TiktokWidget.Service.Dtos.Responses
{
    public class CreateWidgetResponse : ResponseBase
    {
        public string WidgetId { get; set; }
        public CreateWidgetResponse()
        {

        }
        public CreateWidgetResponse(string widgetId)
        {
            WidgetId = widgetId;
        }
    }
}
