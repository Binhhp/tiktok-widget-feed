using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TiktokWidget.Common.Enums;
using TiktokWidget.Service.Commands;
using TiktokWidget.Service.Interfaces;

namespace TiktokWidget.Service.CommandHandlers
{
    public class TikTokClicksCommandHandler : INotificationHandler<TikTokClicksCommand>
    {
        private readonly IPerformancesService _performancesService;
        private readonly IInstagramWidgetService _instagramWidgetService;

        public TikTokClicksCommandHandler(IPerformancesService performancesService, IInstagramWidgetService instagramWidgetService)
        {
            _performancesService = performancesService;
            _instagramWidgetService = instagramWidgetService;
        }

        public async Task Handle(TikTokClicksCommand command, CancellationToken cancellationToken)
        {
            var instagramWidget = _instagramWidgetService.GetById(command.WidgetId).FirstOrDefault();
            if (instagramWidget != null)
            {
                await _performancesService.SetClicksAsync(instagramWidget.ShopId, command.Time, PerformanceTypeEnum.TikTok);
            }
        }
    }
}
