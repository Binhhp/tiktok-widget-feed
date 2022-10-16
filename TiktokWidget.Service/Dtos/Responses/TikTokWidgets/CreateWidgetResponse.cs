using Orichi.IoC.Logging.Models.Models;

namespace TiktokWidget.Service.Dtos.Responses.TikTokWidgets
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
