using MediatR;
using System;

namespace TiktokWidget.Service.Commands
{
    public class InstagramImpressionCommand : INotification
    {
        public string WidgetId { get; set; }
        public DateTime Time { get; set; }
    }
}
