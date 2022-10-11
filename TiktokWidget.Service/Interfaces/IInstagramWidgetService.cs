using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TiktokWidget.Common.HttpLogging.Models;
using TiktokWidget.Service.Context.Entities;
using TiktokWidget.Service.Dtos.Requests.InstagramWidgets;
using TiktokWidget.Service.Dtos.Responses.InstagramWidgets;
using TiktokWidget.Service.Entities;

namespace TiktokWidget.Service.Interfaces
{
    public interface IInstagramWidgetService
    {
        IQueryable<InstagramWidgetEntity> Get(string domain);
        IQueryable<InstagramWidgetEntity> GetById(string key);
        IQueryable<InstagramWidgetEntity> GetByIds(IEnumerable<string> widgetIds);
        Task<CreateInstagramWidgetResponse> CreateWidgetsAsync(string domain, CreateInstagramWidgetRequest request);
        Task<UpdateInstagramWidgetResponse> UpdateWidgetsAsync(string key, CreateInstagramWidgetRequest request);
        Task<ResponseBase> DeleteAsync(string key);
        Task<ResponseBase> UpdateProductAsync(string key, IEnumerable<ProductEntity> products);
        int GetCounts(string domain);
    }
}
