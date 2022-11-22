using MediatR;
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
        private readonly ITikTokWidgetService _tiktokService;
        private readonly IInstagramWidgetService _instagramService;
        public PerformancesService(WidgetFeedDbContext dbContext, ILoggerProvider logger, IHttpContextAccessor httpContextAccessor, IInstagramWidgetService instagramService, ITikTokWidgetService tiktokService)
        {
            _dbContext = dbContext;
            _logger = logger;
            _httpContextAccessor = httpContextAccessor;
            _instagramService = instagramService;
            _tiktokService = tiktokService;
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

                var performances = _dbContext.Performances.Where(x =>
                        x.ShopId.Equals(shop.ID) &&
                        (x.Time.Date > request.StartTime.Date || x.Time.Date == request.StartTime.Date) && (x.Time.Date < request.EndTime.Date || x.Time.Date == request.EndTime.Date))
                        .ToList()
                        .GroupBy(x => x.Time)
                        .Select(x => new PerformanceViewModel
                        {
                            Time = x.Key,
                            Impression = x.Sum(x => x.Impression),
                            Clicks = x.Sum(x => x.ClickPosts.Count())
                        });
                try
                {
                    if (performances.Any())
                    {
                        response.Impression = performances;

                        var totalImpression = performances.Sum(x => x.Impression);
                        var totalClicks = performances.Sum(x => x.Clicks);

                        response.Analytics = new Analytics(totalImpression, totalClicks);
                        var period = request.EndTime.Date.Subtract(request.StartTime.Date).Days;
                        if (period > 0)
                        {
                            var startTimeHistory = request.StartTime.AddDays(-period);
                            var endTimeHistory = request.EndTime.AddDays(-period);

                            var performanceLast = _dbContext.Performances.Where(x =>
                                    x.ShopId.Equals(shop.ID) &&
                                    (x.Time.Date > startTimeHistory.Date || x.Time.Date == startTimeHistory.Date) && (x.Time.Date < endTimeHistory.Date || x.Time.Date == endTimeHistory.Date))
                                    .GroupBy(x => x.Time).Select(x => new PerformanceViewModel
                                    {
                                        Time = x.Key,
                                        Impression = x.Sum(x => x.Impression),
                                        Clicks = x.Sum(x => x.ClickPosts.Count())
                                    }).ToList();

                            if (performanceLast.Any())
                            {
                                var totalImpressionLast = performanceLast.Sum(x => x.Impression);
                                response.Analytics.SetAnlysisImpression(totalImpressionLast);

                                var totalClicksLast = performanceLast.Sum(x => x.Clicks);
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

        public async Task SetClicksAsync(int shopId, string widgetId, string postId, DateTime time, PerformanceTypeEnum type)
        {
            time = ConvertTimeZone(time);
            var performance = _dbContext.Performances.FirstOrDefault(x => x.Time.Date.Equals(time.Date) && x.WidgetId == widgetId && x.Type.Equals(type) && x.ShopId == shopId);
            if(performance != null)
            {
                if(performance.ClickPosts != null)
                {
                    performance.ClickPosts.Add(postId);
                    await _dbContext.SaveChangesAsync();
                }
            }
        }

        public async Task RiseImpressionWidgetAsync(int shopId, string widgetId, DateTime time, PerformanceTypeEnum type)
        {
            try
            {
                time = ConvertTimeZone(time);
                var dateRange = await _dbContext.Performances.FirstOrDefaultAsync(x => x.Time.Date.Equals(time.Date) && x.Type.Equals(type));
                if (dateRange != null)
                {
                    dateRange.Impression += 1;
                }
                else
                {
                    dateRange = new PerformancesEntity
                    {
                        Impression = 1,
                        Time = time,
                        WidgetId = widgetId,
                        Type = type,
                        ShopId = shopId
                    };
                    _dbContext.Performances.Add(dateRange);
                }
                await _dbContext.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                _logger.LogInfo(ex);
            }
        }
        private DateTime ConvertTimeZone(DateTime timeInput)
        {
            var timeZone = _httpContextAccessor.HttpContext.Request?.Headers?["tz"].ToString();
            if (!string.IsNullOrEmpty(timeZone))
            {
                var timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById(timeZone);
                if (timeZoneInfo != null)
                {
                    return TimeZoneInfo.ConvertTime(timeInput, timeZoneInfo);
                }
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

                var performances = _dbContext.Performances.Where(x =>
                        x.ShopId.Equals(shop.ID) &&
                        (x.Time.Date > request.StartTime.Date || x.Time.Date == request.StartTime.Date) && (x.Time.Date < request.EndTime.Date || x.Time.Date == request.EndTime.Date))
                    .ToList();

                if (performances.Any())
                {
                    var postIds = new List<string>();
                    foreach(var performance in performances)
                    {
                        if (performance.ClickPosts.Any())
                        {
                            postIds.AddRange(performance.ClickPosts.Select(x => $"{performance.ShopId}_{performance.WidgetId}_{performance.Type}_{x}"));
                        }
                    }
                    if (postIds.Any())
                    {
                        var postPopulars = postIds.GroupBy(x => x).Select(g => new { Id = g.Key, Count = g.Count() }).OrderByDescending(x => x.Count).Take(3).ToList();
                        if (postPopulars.Any())
                        {
                            foreach(var item in postPopulars)
                            {
                                var detailPost = item.Id.Split("_").ToArray();
                                if ((PerformanceTypeEnum)Enum.Parse(typeof(PerformanceTypeEnum), detailPost[2]) == PerformanceTypeEnum.Instagram)
                                {
                                    var videos = _instagramService.GetVideos(detailPost[1]);
                                    if (videos != null)
                                    {
                                        var videoInfo = videos.FirstOrDefault(x => x.Id == detailPost[3]);
                                        if (videoInfo != null) response.Add(new PostViewModel
                                        {
                                            Id = videoInfo.Id,
                                            Description= videoInfo.Description,
                                            Clicks = item.Count,
                                            Impression = performances.Where(x => x.WidgetId == detailPost[1]).Sum(x => x.Impression),
                                            Image = videoInfo.ImageUrl
                                        });
                                    }
                                }
                                else if((PerformanceTypeEnum)Enum.Parse(typeof(PerformanceTypeEnum), detailPost[2]) == PerformanceTypeEnum.TikTok)
                                {
                                    var videos = _tiktokService.GetVideos(detailPost[1]);
                                    if (videos != null)
                                    {
                                        var videoInfo = videos.FirstOrDefault(x => x.id == detailPost[3]);
                                        if (videoInfo != null) response.Add(new PostViewModel
                                        {
                                            Id = videoInfo.id,
                                            Description = videoInfo.desc,
                                            Clicks = item.Count,
                                            Impression = performances.Where(x => x.WidgetId == detailPost[1]).Sum(x => x.Impression),
                                            Image = videoInfo.video.originCover
                                        });
                                    }
                                }
                            }
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
    }
}
