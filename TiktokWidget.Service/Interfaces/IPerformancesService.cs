using Orichi.IoC.Containers.LifeScoped;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TiktokWidget.Common.Enums;
using TiktokWidget.Service.Dtos.Responses.Shops;
using TiktokWidget.Service.ViewModels;

namespace TiktokWidget.Service.Interfaces
{
    public interface IPerformancesService : IScopedDependency
    {
        Task RiseImpressionWidgetAsync(int shopId, string widgetId, DateTime time, PerformanceTypeEnum type);
        Task SetClicksAsync(int shopId, string widgetId, string postId, DateTime time, PerformanceTypeEnum type);
        Task<AnalyzeWidgetResponse> Analytics(string domain, AnalyzeWidgetRequest request);
        Task<IEnumerable<PostViewModel>> GetPostPopular(string domain, AnalyzeWidgetRequest request);
    }
}
