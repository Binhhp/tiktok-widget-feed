using MediatR;
using System.Linq;
using TiktokWidget.Service.Models;

namespace TiktokWidget.Service.Commands
{
    public class GetTikTokVideoCommand : IRequest<IQueryable<TikTokVideoViewModel>>
    {
        public string Key { get; set; }
        public GetTikTokVideoCommand(string key)
        {
            Key = key;
        }
    }
}
