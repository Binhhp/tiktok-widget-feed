using Orichi.IoC.Containers.LifeScoped;
using Orichi.IoC.Logging.Models.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TiktokWidget.Service.Dtos.Requests.TikTokWidgets;
using TiktokWidget.Service.Dtos.Requests.Widget;
using TiktokWidget.Service.Dtos.Responses.TikTokWidgets;
using TiktokWidget.Service.Entities;
using TiktokWidget.Service.Models;

namespace TiktokWidget.Service.Interfaces
{
    public interface IWidgetService : IScopedDependency
    {
        IQueryable<TikTokWidgetEntity> Get(string domain);
        IQueryable<TikTokWidgetEntity> GetById(string key);
        IQueryable<TikTokWidgetEntity> GetByIds(IEnumerable<string> widgetIds);
        Task<CreateWidgetResponse> CreateAsync(string domain, WidgetCreateDto request);
        Task<ResponseBase> UpdateAsync(string key, UpdateWidgetRequest request);
        Task<ResponseBase> DeleteAsync(string key);
        Task<ResponseBase> UpdateProductAsync(string key, IEnumerable<ProductEntity> products);
        IQueryable<VideoTikTokModel> GetVideos(string widgetId);
        int GetCounts(string domain);
        Task<AddJobResponse> AddJob(AddJobRequest request);
        IQueryable<VideoTikTokModel> GetVideoJob(GetVideoByJobRequest request);
    }
}
