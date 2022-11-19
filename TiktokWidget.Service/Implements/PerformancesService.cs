using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Orichi.IoC.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;
using TiktokWidget.Common.Enums;
using TiktokWidget.Common.Utils;
using TiktokWidget.Service.BusinessExceptions;
using TiktokWidget.Service.Context;
using TiktokWidget.Service.Dtos.Responses.Shops;
using TiktokWidget.Service.Entities;
using TiktokWidget.Service.Interfaces;

namespace TiktokWidget.Service.Implements
{
    public class PerformancesService : IPerformancesService
    {
        private readonly WidgetFeedDbContext _dbContext;
        private readonly ILoggerProvider _logger;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public PerformancesService(WidgetFeedDbContext dbContext, ILoggerProvider logger, IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = dbContext;
            _logger = logger;
            _httpContextAccessor = httpContextAccessor;
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
        public async Task<AnalyzeWidgetResponse> Analytics(string domain, AnalyzeWidgetRequest request)
        {
            var response = new AnalyzeWidgetResponse();
            try
            {
                var timeZoneFromQuery = _httpContextAccessor.HttpContext.Request?.Headers?["tz"].ToString();
                if(!string.IsNullOrEmpty(timeZoneFromQuery))
                {
                    request.StartTime = TimezoneProvider.ConvertIANATimezone(request.StartTime, timeZoneFromQuery);
                    request.EndTime = TimezoneProvider.ConvertIANATimezone(request.EndTime, timeZoneFromQuery); 
                }
                var shop = await _dbContext.Shop.FirstOrDefaultAsync(x => x.Domain.ToLower().Equals(domain.ToLower()));
                if (shop != null)
                {
                    var performances = await _dbContext.Performances.Where(x => 
                    x.ShopId.Equals(shop.ID) && 
                    (x.Time.Date > request.StartTime.Date || x.Time.Date == request.StartTime.Date) && (x.Time.Date < request.EndTime.Date || x.Time.Date == request.EndTime.Date))
                        .ToListAsync();
                    try
                    {
                        if (performances.Any())
                        {
                            response.Impression = performances.Select(x => new PerformanceViewModel
                            {
                                Time = x.Time,
                                Impression = x.InstagramTraffic + x.TikTokTraffic,
                                Clicks = x.InstagramClicks + x.TikTokClicks
                            }).OrderBy(x => x.Time).ToList();

                            var totalImpression = performances.Sum(_ => _.InstagramTraffic) + performances.Sum(_ => _.TikTokTraffic);
                            var totalClicks = performances.Sum(_ => _.InstagramClicks) + performances.Sum(_ => _.TikTokClicks);

                            response.Analytics = new Analytics(totalImpression, totalClicks);
                            var period = request.EndTime.Date.Subtract(request.StartTime.Date).Days;
                            if (period > 0)
                            {
                                var startTimeHistory = request.StartTime.AddDays(-period);
                                var endTimeHistory = request.EndTime.AddDays(-period);

                                var performanceLast = await _dbContext.Performances.Where(x =>
                                   x.ShopId.Equals(shop.ID) &&
                                   (x.Time.Date > startTimeHistory.Date || x.Time.Date == startTimeHistory.Date) && (x.Time.Date < endTimeHistory.Date || x.Time.Date == endTimeHistory.Date))
                                       .ToListAsync();

                                if (performanceLast.Any())
                                {
                                    var totalImpressionLast = performanceLast.Sum(x => x.InstagramTraffic) + performances.Sum(x => x.TikTokTraffic);
                                    response.Analytics.SetAnlysisImpression(totalImpressionLast);

                                    var totalClicksLast = performanceLast.Sum(_ => _.InstagramClicks) + performances.Sum(_ => _.TikTokClicks);
                                    response.Analytics.SetAnlysisClicks(totalClicksLast);

                                    response.Analytics.SetAnlysisConversationRate(totalImpressionLast, totalClicksLast);
                                }
                                else
                                {
                                    response.Analytics.Impression.AnalysisIndicator = 1;
                                    response.Analytics.Clicks.AnalysisIndicator = 1;
                                    response.Analytics.ConversationRate.AnalysisIndicator = 1;
                                }
                            }
                        }
                    }
                    catch(Exception ex)
                    {
                        _logger.LogInfo(ex);
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogInfo(ex);
            }
            return response;
        }

        public async Task SetClicksAsync(int shopId, DateTime time, PerformanceTypeEnum type)
        {
            var shop = _dbContext.Shop.Include(x => x.ShopConfiguration).FirstOrDefault(x => x.ID.Equals(shopId));
            if (shop == null) throw new NotFoundException("Shop");

            var timezone = shop?.ShopConfiguration?.Timezone;
            var performanceByTime = _dbContext.Performances.FirstOrDefault(x => x.ShopId.Equals(shopId) && x.Time.Date.Equals(time.Date));
            if (performanceByTime != null)
            {
                if (type.Equals(PerformanceTypeEnum.Instagram))
                {
                    performanceByTime.InstagramClicks += 1;
                }
                else if (type.Equals(PerformanceTypeEnum.TikTok))
                {
                    performanceByTime.TikTokClicks += 1;
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
                    performanceEntity.InstagramClicks = 1;
                }
                else if (type.Equals(PerformanceTypeEnum.TikTok))
                {
                    performanceEntity.TikTokClicks = 1;
                }
                await _dbContext.Performances.AddAsync(performanceEntity);
            }
            await _dbContext.SaveChangesAsync();
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
