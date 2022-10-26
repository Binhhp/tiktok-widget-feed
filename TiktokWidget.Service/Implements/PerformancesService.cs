using Orichi.IoC.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;
using TiktokWidget.Common.Enums;
using TiktokWidget.Service.Context;
using TiktokWidget.Service.Entities;
using TiktokWidget.Service.Interfaces;

namespace TiktokWidget.Service.Implements
{
    public class PerformancesService : IPerformancesService
    {
        private readonly WidgetFeedDbContext _dbContext;
        private readonly ILoggerProvider _logger;
        public PerformancesService(WidgetFeedDbContext dbContext, ILoggerProvider logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        public IQueryable<PerformancesEntity> Get(string domain)
        {
            var response = Enumerable.Empty<PerformancesEntity>().AsQueryable();
            try
            {
                var shop = _dbContext.Shop.FirstOrDefault(x => x.Domain.ToLower().Equals(domain.ToLower()));
                if(shop != null)
                {
                    response = _dbContext.Performances.Where(x => x.ShopId.Equals(shop.Domain));
                }
            }
            catch(Exception ex)
            {
                _logger.LogInfo(ex);
            }
            return response;    
        }

        public async Task SetPerformanceAsync(int shopId, DateTime time, PerformanceTypeEnum type)
        {
            var performanceByTime = _dbContext.Performances.FirstOrDefault(x => x.ShopId.Equals(shopId) && x.Time.Date.Equals(time.Date) && x.Type.Equals(type));
            if (performanceByTime != null)
            {
                performanceByTime.Traffic += 1;
            }
            else
            {
                await _dbContext.Performances.AddAsync(new PerformancesEntity
                {
                    Type = type,
                    Time = time,
                    Traffic = 1,
                    ShopId = shopId
                });
            }
            await _dbContext.SaveChangesAsync();
        }
    }
}
