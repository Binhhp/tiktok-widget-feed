using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TiktokWidget.Service.Commands;
using TiktokWidget.Service.Interfaces;
using TiktokWidget.Service.Models;

namespace TiktokWidget.Service.CommandHandlers
{
    public class GetTikTokVideoCommandHandler : IRequestHandler<GetTikTokVideoCommand, IQueryable<TikTokVideoViewModel>>
    {
        private readonly ITikTokWidgetService _tiktokWidgetService;

        public GetTikTokVideoCommandHandler(ITikTokWidgetService tiktokWidgetService)
        {
            _tiktokWidgetService = tiktokWidgetService;
        }

        public Task<IQueryable<TikTokVideoViewModel>> Handle(GetTikTokVideoCommand request, CancellationToken cancellationToken)
        {
            return Task.FromResult(_tiktokWidgetService.GetVideos(request.Key));
        }
    }
}
