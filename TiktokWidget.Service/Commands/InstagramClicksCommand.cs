using MediatR;
using System;

namespace TiktokWidget.Service.Commands
{
    public class InstagramClicksCommand : INotification
    {
        public string WidgetId { get; set; }
        public DateTime Time { get; set; }
    }
}
