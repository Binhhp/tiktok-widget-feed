using Microsoft.EntityFrameworkCore;
using Orichi.IoC.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;
using TiktokWidget.Common.Enums;
using TiktokWidget.Common.Utils;
using TiktokWidget.Service.BusinessExceptions;
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
                if (shop != null)
                {
                    response = _dbContext.Performances.Where(x => x.ShopId.Equals(shop.ID));
                }
            }
            catch (Exception ex)
            {
                _logger.LogInfo(ex);
            }
            return response;    
        }

        public async Task SetPerformanceAsync(int shopId, DateTime time, PerformanceTypeEnum type)
        {
            var shop = _dbContext.Shop.Include(x => x.ShopConfiguration).FirstOrDefault(x => x.ID.Equals(shopId));
            if (shop == null) throw new NotFoundException("Shop");

            var timezone = shop?.ShopConfiguration?.Timezone;
            var performanceByTime = _dbContext.Performances.FirstOrDefault(x => x.ShopId.Equals(shopId) && x.Time.Date.Equals(time.Date));
            if (performanceByTime != null)
            {
                if (type.Equals(PerformanceTypeEnum.Instagram))
                {
                    performanceByTime.InstagramTraffic += 1;
                }
                else if (type.Equals(PerformanceTypeEnum.TikTok))
                {
                    performanceByTime.TikTokTraffic += 1;
                }
            }
            else
            {
                if (!string.IsNullOrEmpty(timezone))
                {
                    time = TimezoneProvider.ConvertIANATimezone(time, timezone);
                }
                var performanceEntity = new PerformancesEntity
                {
                    Time = time,
                    ShopId = shopId
                };
                if (type.Equals(PerformanceTypeEnum.Instagram))
                {
                    performanceEntity.InstagramTraffic = 1;
                }
                else if (type.Equals(PerformanceTypeEnum.TikTok))
                {
                    performanceEntity.TikTokTraffic = 1;
                }
                await _dbContext.Performances.AddAsync(performanceEntity);
            }
            await _dbContext.SaveChangesAsync();
        }
    }
}
