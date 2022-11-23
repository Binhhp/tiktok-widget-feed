using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TiktokWidget.Service.Commands;
using TiktokWidget.Service.Interfaces;

namespace TiktokWidget.Service.CommandHandlers
{
    public class TikTokClicksCommandHandler : INotificationHandler<TikTokClicksCommand>
    {
        private readonly IPerformancesService _performancesService;
        private readonly ITikTokWidgetService _tiktokService;

        public TikTokClicksCommandHandler(IPerformancesService performancesService, ITikTokWidgetService tiktokService)
        {
            _performancesService = performancesService;
            _tiktokService = tiktokService;
        }

        public async Task Handle(TikTokClicksCommand command, CancellationToken cancellationToken)
        {
            var tiktokWidget = _tiktokService.GetById(command.WidgetId).FirstOrDefault();
            if (tiktokWidget != null)
            {
                await _performancesService.SetClicksAsync(command.Time, new Dtos.Requests.Shops.PostWidgetDto
                {
                    WidgetId = tiktokWidget.Id,
                    ShopId = tiktokWidget.ShopId,
                    Type = Common.Enums.PerformanceTypeEnum.TikTok,
                    Information = command.PostWidgetInformation
                });
            }
        }
    }
}
