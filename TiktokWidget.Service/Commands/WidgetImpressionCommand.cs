using MediatR;
using System;
using TiktokWidget.Common.Enums;

namespace TiktokWidget.Service.Commands
{
    public class WidgetImpressionCommand : INotification
    {
        public string WidgetId { get; set; }
        public DateTime Time { get; set; }
        public PerformanceTypeEnum Type { get; set; }
    }
}
