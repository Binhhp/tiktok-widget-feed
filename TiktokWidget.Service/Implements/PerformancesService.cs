using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Orichi.IoC.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TiktokWidget.Common.Enums;
using TiktokWidget.Common.Utils;
using TiktokWidget.Service.BusinessExceptions;
using TiktokWidget.Service.Context;
using TiktokWidget.Service.Dtos.Requests.Shops;
using TiktokWidget.Service.Dtos.Responses.Shops;
using TiktokWidget.Service.Entities;
using TiktokWidget.Service.Interfaces;
using TiktokWidget.Service.ViewModels;

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
        public async Task<AnalyzeWidgetResponse> Analytics(string domain, AnalyzeWidgetRequest request)
        {
            var response = new AnalyzeWidgetResponse();
            try
            {
                var shop = await _dbContext.Shop.FirstOrDefaultAsync(x => x.Domain.ToLower().Equals(domain.ToLower()));
                if (shop == null) throw new NotFoundException(domain);

                var timeZoneFromQuery = _httpContextAccessor.HttpContext.Request?.Headers?["tz"].ToString();
                if (!string.IsNullOrEmpty(timeZoneFromQuery))
                {
                    request.StartTime = TimezoneProvider.ConvertIANATimezone(request.StartTime, timeZoneFromQuery);
                    request.EndTime = TimezoneProvider.ConvertIANATimezone(request.EndTime, timeZoneFromQuery);
                }
                var performanceCurrent = GetPerformances(shop.ID, request.StartTime, request.EndTime);
                try
                {
                    if (performanceCurrent.Any())
                    {
                        response.Impression = performanceCurrent;

                        var totalImpression = performanceCurrent.Sum(x => x.Impression);
                        var totalClicks = performanceCurrent.Sum(x => x.Clicks);

                        response.Analytics = new Analytics(totalImpression, totalClicks);
                        var period = request.EndTime.Date.Subtract(request.StartTime.Date).Days;
                        if (period > 0)
                        {
                            var startTimeHistory = request.StartTime.AddDays(-period);
                            var endTimeHistory = request.EndTime.AddDays(-period);

                            var performanceLastTime = GetPerformances(shop.ID, startTimeHistory, endTimeHistory);

                            if (performanceLastTime.Any())
                            {
                                var totalImpressionLast = performanceLastTime.Sum(x => x.Impression);
                                response.Analytics.SetAnlysisImpression(totalImpressionLast);

                                var totalClicksLast = performanceLastTime.Sum(x => x.Clicks);
                                response.Analytics.SetAnlysisClicks(totalClicksLast);

                                response.Analytics.SetAnlysisConversationRate(totalImpressionLast, totalClicksLast);
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogInfo(ex);
                }
            }
            catch (Exception ex)
            {
                _logger.LogInfo(ex);
            }
            return response;
        }

        private IEnumerable<PerformanceViewModel> GetPerformances(int shopId, DateTime startTime, DateTime endTime)
        {
            var response = new List<PerformanceViewModel>();
            try
            {
                var impressionWidgets = _dbContext.ImpressionWidget.Where(x =>
                        x.ShopId.Equals(shopId) &&
                        (x.Time.Date > startTime.Date || x.Time.Date == startTime.Date) && (x.Time.Date < endTime.Date || x.Time.Date == endTime.Date))
                        .ToList();
                if (impressionWidgets.Any())
                {
                    var clickPostSchedules = new List<AnalysticItem>();
                    var clickPosts = _dbContext.PostClickWidget.Where(x =>
                                x.ShopId.Equals(shopId) &&
                                (x.Time.Date > startTime.Date || x.Time.Date == startTime.Date) && (x.Time.Date < endTime.Date || x.Time.Date == endTime.Date))
                                .ToList();

                    if (clickPosts.Any())
                    {
                        clickPostSchedules = clickPosts.GroupBy(x => x.Time.Date)
                                .Select(x => new AnalysticItem
                                {
                                    Time = x.Key,
                                    Count = x.Sum(x => x.Click)
                                }).ToList();

                    }

                    response = impressionWidgets.GroupBy(x => x.Time.Date).Select(x => new PerformanceViewModel
                    {
                        Time = x.Key,
                        Impression = x.Sum(x => x.Impression),
                        Clicks = clickPostSchedules.FirstOrDefault(c => c.Time == x.Key)?.Count ?? 0
                    }).ToList();
                }
            }
            catch(Exception ex)
            {
                _logger.LogInfo(ex);
            }
            return response;
        }

        public async Task SetClicksAsync(DateTime dateTime, PostWidgetDto request)
        {
            dateTime = ConvertTimeZone(dateTime);
            var postClicks = _dbContext.PostClickWidget.FirstOrDefault(x => 
                x.PostInfo.Id == request.Information.Id &&
                x.Time.Date.Equals(dateTime.Date) && 
                x.WidgetId == request.WidgetId && 
                x.Type.Equals(request.Type));

            if(postClicks != null)
            {
                postClicks.PostInfo = request.Information;
                postClicks.Click += 1;
            }
            else
            {
                await _dbContext.PostClickWidget.AddAsync(new PostClickWidgetEntity
                {
                    Click = 1,
                    ShopId = request.ShopId,
                    PostInfo = request.Information,
                    Time = dateTime,
                    Type = request.Type,
                    WidgetId = request.WidgetId,
                });
            }
            await _dbContext.SaveChangesAsync();
        }

        public async Task RiseImpressionWidgetAsync(int shopId, string widgetId, DateTime time, PerformanceTypeEnum type)
        {
            time = ConvertTimeZone(time);
            var dateRange = await _dbContext.ImpressionWidget.FirstOrDefaultAsync(x =>
                    x.Time.Date.Equals(time.Date) &&
                    x.Type.Equals(type) &&
                    x.WidgetId == widgetId &&
                    x.ShopId == shopId);

            if (dateRange != null) dateRange.Impression += 1;
            else
            {
                dateRange = new ImpressionWidgetEntity
                {
                    Impression = 1,
                    Time = time,
                    WidgetId = widgetId,
                    Type = type,
                    ShopId = shopId
                };
                _dbContext.ImpressionWidget.Add(dateRange);
            }
            await _dbContext.SaveChangesAsync();
        }

        private DateTime ConvertTimeZone(DateTime timeInput)
        {
            var timeZone = _httpContextAccessor.HttpContext.Request?.Headers?["tz"].ToString();
            if (!string.IsNullOrEmpty(timeZone))
            {
                return TimezoneProvider.ConvertIANATimezone(timeInput, timeZone);
            }
            return timeInput;
        }

        public async Task<IEnumerable<PostViewModel>> GetPostPopular(string domain, AnalyzeWidgetRequest request)
        {
            var response = new List<PostViewModel>();

            try
            {
                var shop = await _dbContext.Shop.FirstOrDefaultAsync(x => x.Domain.ToLower().Equals(domain.ToLower()));
                if (shop == null) throw new NotFoundException(domain);

                var timeZoneFromQuery = _httpContextAccessor.HttpContext.Request?.Headers?["tz"].ToString();
                if (!string.IsNullOrEmpty(timeZoneFromQuery))
                {
                    request.StartTime = TimezoneProvider.ConvertIANATimezone(request.StartTime, timeZoneFromQuery);
                    request.EndTime = TimezoneProvider.ConvertIANATimezone(request.EndTime, timeZoneFromQuery);
                }
                var clickPosts = _dbContext.PostClickWidget.Where(x =>
                                x.ShopId.Equals(shop.ID) &&
                                (x.Time.Date > request.StartTime.Date || x.Time.Date == request.StartTime.Date) && (x.Time.Date < request.EndTime.Date || x.Time.Date == request.EndTime.Date))
                                .OrderByDescending(x => x.Time)
                                .ToList();
                if (clickPosts.Any())
                {
                    var postIds = clickPosts.GroupBy(x => x.PostInfo.Id)
                                .Select(p => new
                                {
                                    Id = p.Key,
                                    Clicks = p.Sum(x => x.Click)
                                }).OrderByDescending(x => x.Clicks).Take(3).ToList();
                    if (postIds.Any())
                    {
                        var impressionWidgets = _dbContext.ImpressionWidget.Where(x =>
                            x.ShopId.Equals(shop.ID) &&
                            (x.Time.Date > request.StartTime.Date || x.Time.Date == request.StartTime.Date) && (x.Time.Date < request.EndTime.Date || x.Time.Date == request.EndTime.Date))
                            .ToList();

                        var impressionWidgetArr = new Dictionary<string, long>();
                        if (impressionWidgets.Any())
                        {
                            impressionWidgetArr = impressionWidgets.GroupBy(x => x.WidgetId).ToDictionary(x => x.Key, x => x.Sum(w => w.Impression));
                        }
                        foreach (var item in postIds)
                        {
                            var postCurrent = clickPosts.FirstOrDefault(x => x.PostInfo.Id == item.Id);
                            var post = new PostViewModel
                            {
                                Clicks = item.Clicks,
                                Id = item.Id,
                                Description = postCurrent?.PostInfo?.Description,
                                Image = postCurrent?.PostInfo?.Image
                            };
                            if (impressionWidgetArr.TryGetValue(postCurrent.WidgetId, out var impression))
                            {
                                post.Impression = impression;
                            }
                            response.Add(post);
                        }
                    }
                }
            }
            catch(Exception ex)
            {
                _logger.LogInfo(ex);
            }
            return response;
        }

        public async Task RemoveHistoryWidget(string widgetId, PerformanceTypeEnum type)
        {
            try
            {
                var impressionWidgets = _dbContext.ImpressionWidget.Where(x => x.WidgetId == widgetId && x.Type.Equals(type)).ToList();
                if(impressionWidgets.Any())
                {
                    _dbContext.ImpressionWidget.RemoveRange(impressionWidgets);
                }

                var clickPosts = _dbContext.PostClickWidget.Where(x => x.WidgetId == widgetId).ToList();
                if (clickPosts.Any())
                {
                    _dbContext.PostClickWidget.RemoveRange(clickPosts);
                }
                await _dbContext.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                _logger.LogInfo(ex);
            }
        }
    }

    public class AnalysticItem
    {
        public DateTime Time { get; set; }
        public int Count { get; set; }
    }
}
