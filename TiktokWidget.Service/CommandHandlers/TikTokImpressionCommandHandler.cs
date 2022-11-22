using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TiktokWidget.Common.Enums;
using TiktokWidget.Service.Commands;
using TiktokWidget.Service.Interfaces;

namespace TiktokWidget.Service.CommandHandlers
{
    public class TikTokImpressionCommandHandler : INotificationHandler<TikTokImpressionCommand>
    {
        private readonly IPerformancesService _performancesService;
        private readonly ITikTokWidgetService _tiktokWidgetService;

        public TikTokImpressionCommandHandler(IPerformancesService performancesService, ITikTokWidgetService tiktokWidgetService)
        {
            _performancesService = performancesService;
            _tiktokWidgetService = tiktokWidgetService;
        }

        public async Task Handle(TikTokImpressionCommand command, CancellationToken cancellationToken)
        {
            var tikTokWidget = _tiktokWidgetService.GetById(command.WidgetId).FirstOrDefault();
            if (tikTokWidget != null)
            {
                await _performancesService.RiseImpressionWidgetAsync(tikTokWidget.ShopId, tikTokWidget.Id, command.Time, PerformanceTypeEnum.TikTok);
            }
        }
    }
}
