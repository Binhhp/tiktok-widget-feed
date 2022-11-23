using MediatR;
using System;
using TiktokWidget.Service.Entities;

namespace TiktokWidget.Service.Commands
{
    public class InstagramClicksCommand : INotification
    {
        public string WidgetId { get; set; }
        public DateTime Time { get; set; }
        public PostWidgetInformation PostWidgetInformation { get; set; }
    }
}
