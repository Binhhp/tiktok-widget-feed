using MediatR;
using System.Linq;
using TiktokWidget.Service.ViewModels;

namespace TiktokWidget.Service.Commands
{
    public class GetInstagramVideoCommand : IRequest<IQueryable<InstagramViewModel>>
    {
        public string Key { get; set; }
        public GetInstagramVideoCommand(string key)
        {
            Key = key;
        }
    }
}
