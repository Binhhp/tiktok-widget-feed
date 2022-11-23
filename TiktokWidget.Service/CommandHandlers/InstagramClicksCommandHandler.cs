using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TiktokWidget.Common.Enums;
using TiktokWidget.Service.Commands;
using TiktokWidget.Service.Dtos.Requests.Shops;
using TiktokWidget.Service.Interfaces;

namespace TiktokWidget.Service.CommandHandlers
{
    public class InstagramClicksCommandHandler : INotificationHandler<InstagramClicksCommand>
    {
        private readonly IPerformancesService _performancesService;
        private readonly IInstagramWidgetService _instagramWidgetService;

        public InstagramClicksCommandHandler(IPerformancesService performancesService, IInstagramWidgetService instagramWidgetService)
        {
            _performancesService = performancesService;
            _instagramWidgetService = instagramWidgetService;
        }

        public async Task Handle(InstagramClicksCommand command, CancellationToken cancellationToken)
        {
            var instagramWidget = _instagramWidgetService.GetById(command.WidgetId).FirstOrDefault();
            if (instagramWidget != null)
            {
                await _performancesService.SetClicksAsync(command.Time, new PostWidgetDto
                {
                    Information = command.PostWidgetInformation,
                    ShopId = instagramWidget.ShopId,
                    Type = PerformanceTypeEnum.Instagram,
                    WidgetId = instagramWidget.Id
                });
            }
        }
    }
}
