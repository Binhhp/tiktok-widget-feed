using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TiktokWidget.Common.Enums;
using TiktokWidget.Service.Commands;
using TiktokWidget.Service.Interfaces;

namespace TiktokWidget.Service.CommandHandlers
{
    public class InstagramImpressionCommandHandler : INotificationHandler<InstagramImpressionCommand>
    {
        private readonly IPerformancesService _performancesService;
        private readonly IInstagramWidgetService _instagramWidgetService;

        public InstagramImpressionCommandHandler(IPerformancesService performancesService, IInstagramWidgetService instagramWidgetService)
        {
            _performancesService = performancesService;
            _instagramWidgetService = instagramWidgetService;
        }

        public async Task Handle(InstagramImpressionCommand command, CancellationToken cancellationToken)
        {
            var instagramWidget = _instagramWidgetService.GetById(command.WidgetId).FirstOrDefault();
            if (instagramWidget != null)
            {
                await _performancesService.RiseImpressionWidgetAsync(instagramWidget.ShopId, instagramWidget.Id, command.Time, PerformanceTypeEnum.Instagram);
            }
        }
    }
}
