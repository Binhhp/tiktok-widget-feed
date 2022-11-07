using Orichi.IoC.Containers.LifeScoped;
using System;
using System.Linq;
using System.Threading.Tasks;
using TiktokWidget.Common.Enums;
using TiktokWidget.Service.Dtos.Responses.Shops;
using TiktokWidget.Service.Entities;

namespace TiktokWidget.Service.Interfaces
{
    public interface IPerformancesService : IScopedDependency
    {
        Task SetPerformanceAsync(int shopId, DateTime time, PerformanceTypeEnum type);
        Task SetClicksAsync(int shopId, DateTime time, PerformanceTypeEnum type);
        Task<AnalyzeWidgetResponse> Analytics(string domain, AnalyzeWidgetRequest request);
        IQueryable<PerformancesEntity> Get(string domain);
    }
}
