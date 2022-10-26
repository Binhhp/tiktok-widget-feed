using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TiktokWidget.Service.Commands;
using TiktokWidget.Service.Interfaces;

namespace TiktokWidget.Service.CommandHandlers
{
    public class WidgetImpressionCommandHandler : INotificationHandler<WidgetImpressionCommand>
    {
        private readonly IPerformancesService _performancesService;
        private readonly IWidgetService _widgetService;

        public WidgetImpressionCommandHandler(IPerformancesService performancesService, IWidgetService widgetService)
        {
            _performancesService = performancesService;
            _widgetService = widgetService;
        }

        public async Task Handle(WidgetImpressionCommand command, CancellationToken cancellationToken)
        {
            var widget = _widgetService.GetById(command.WidgetId).FirstOrDefault();
            if(widget != null)
            {
                await _performancesService.SetPerformanceAsync(widget.ShopId, command.Time, command.Type);
            }
        }
    }
}
