using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TiktokWidget.Service.Commands;
using TiktokWidget.Service.Interfaces;
using TiktokWidget.Service.ViewModels;

namespace TiktokWidget.Service.CommandHandlers
{
    public class GetInstagramVideoCommandHandler : IRequestHandler<GetInstagramVideoCommand, IQueryable<InstagramViewModel>>
    {
        private readonly IInstagramWidgetService instagramWidgetService;

        public GetInstagramVideoCommandHandler(IInstagramWidgetService instagramWidgetService)
        {
            this.instagramWidgetService = instagramWidgetService;
        }

        public Task<IQueryable<InstagramViewModel>> Handle(GetInstagramVideoCommand request, CancellationToken cancellationToken)
        {
            return Task.FromResult(instagramWidgetService.GetVideos(request.Key));
        }
    }
}
