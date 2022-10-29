using MediatR;
using System;

namespace TiktokWidget.Service.Commands
{
    public class TikTokImpressionCommand : INotification
    {
        public string WidgetId { get; set; }
        public DateTime Time { get; set; }
    }
}
