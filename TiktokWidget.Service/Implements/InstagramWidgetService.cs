﻿using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Orichi.IoC.Logging;
using Orichi.IoC.Logging.Models.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using TiktokWidget.Common.Enums;
using TiktokWidget.Service.BusinessExceptions;
using TiktokWidget.Service.Context;
using TiktokWidget.Service.Dtos.Requests.InstagramWidgets;
using TiktokWidget.Service.Dtos.Requests.TikTokWidgets;
using TiktokWidget.Service.Dtos.Responses.InstagramWidgets;
using TiktokWidget.Service.Dtos.Responses.TikTokWidgets;
using TiktokWidget.Service.Entities;
using TiktokWidget.Service.Extensions;
using TiktokWidget.Service.Interfaces;
using TiktokWidget.Service.ViewModels;

namespace TiktokWidget.Service.Implements
{
    public class InstagramWidgetService : IInstagramWidgetService
    {
        private readonly WidgetFeedDbContext _widgetDbContext;
        private readonly IMapper _mapper;
        private readonly ILoggerProvider _logger;
        private readonly IPerformancesService _performancesService;
        public InstagramWidgetService(WidgetFeedDbContext widgetDbContext, IMapper mapper, ILoggerProvider logger, IPerformancesService performancesService)
        {
            _widgetDbContext = widgetDbContext;
            _mapper = mapper;
            _logger = logger;
            _performancesService = performancesService;
        }
        /// <summary>
        /// get list widget
        /// </summary>
        /// <param name="domain">domain of shop</param>
        public IQueryable<InstagramWidgetViewModel> Get(string domain)
        {
            var response = new List<InstagramWidgetViewModel>();
            var widgets = _widgetDbContext.InstagramWidgets.Include(x => x.Products).Where(x => x.Shops != null && x.Shops.Domain.Equals(domain)).ToList();
            bool isSaveChanges = false;
            if(widgets.Any())
            {
                foreach (var widget in widgets)
                {
                    var widgetResp = _mapper.Map<InstagramWidgetViewModel>(widget);
                    try
                    {
                        string type = (widget.SourceType == SourceTypeEnum.InstagramHashTag || widget.SourceType == SourceTypeEnum.HashTag) ? "insta-hashtag" : "insta-username";
                        var pathFile = Path.Combine(Directory.GetCurrentDirectory(), "JsonData", "Video", type, $"{widget.ValueSource}.json");
                        var JSON = File.ReadAllText(pathFile);
                        if (!string.IsNullOrEmpty(JSON))
                        {
                            var videos = JsonConvert.DeserializeObject<IEnumerable<InstagramViewModel>>(JSON).OrderByDescending(x => x.TakenAt).ToList();
                            widgetResp.Videos = videos.Count();
                            if (videos.Count() > widget.ItemSorts.Count())
                            {
                                var differenceVideos = videos.Count() - widget.ItemSorts.Count();
                                var videoNewImports = videos.GetRange(0, differenceVideos).Select(x => x.Id).ToList();
                                videoNewImports.AddRange(widget.ItemSorts);
                                widget.ItemSorts = videoNewImports;
                                widgetResp.ItemSorts = widget.ItemSorts;

                                if (!isSaveChanges)
                                {
                                    isSaveChanges = true;
                                }
                                //Update widget wrong sourcetype from version before
                                if (widget.SourceType == SourceTypeEnum.HashTag)
                                {
                                    widget.SourceType = SourceTypeEnum.InstagramHashTag;
                                }
                                else if (widget.SourceType == SourceTypeEnum.UserName)
                                {
                                    widget.SourceType = SourceTypeEnum.InstagramUserName;
                                }
                                _widgetDbContext.Update(widget);
                            }
                        }
                        else
                        {
                            widgetResp.Videos = widget.Setting.LimitItems;
                        }
                    }
                    catch
                    {
                        widgetResp.Videos = widget.Setting.LimitItems;
                        AddJob(new AddJobRequest
                        {
                            Data = widget.ValueSource,
                            Type = widget.SourceType
                        }).GetAwaiter().GetResult();
                    }
                    response.Add(widgetResp);
                }
            }
            if (isSaveChanges)
            {
                _widgetDbContext.SaveChanges();
            }
            return response.AsQueryable();
        }
        /// <summary>
        /// get by single id
        /// </summary>
        /// <param name="key">key of widget</param>
        public IQueryable<InstagramWidgetEntity> GetById(string key)
        {
            var response = Enumerable.Empty<InstagramWidgetEntity>().AsQueryable();
            response = _widgetDbContext.InstagramWidgets.Where(x => x.Id.Equals(key));
            return response;
        }
        /// <summary>
        /// get widgets by ids
        /// </summary>
        /// <param name="widgetIds">list ids</param>
        public IQueryable<InstagramWidgetEntity> GetByIds(IEnumerable<string> widgetIds)
        {
            var response = Enumerable.Empty<InstagramWidgetEntity>().AsQueryable();
            response = _widgetDbContext.InstagramWidgets.Where(x => widgetIds.Any(w => w.Equals(x.Id)));
            return response;
        }
        /// <summary>
        /// get number of widgets
        /// </summary>
        /// <param name="domain">domain of shop client</param>
        public int GetCounts(string domain)
        {
            var result = 0;
            result = _widgetDbContext.InstagramWidgets.Where(x => x.Shops != null && x.Shops.Domain.Equals(domain)).Count();
            return result;
        }
        /// <summary>
        /// create widget
        /// </summary>
        /// <param name="domain">domain (shop)</param>
        /// <param name="request">information of widget</param>
        public async Task<CreateInstagramWidgetResponse> CreateWidgetsAsync(string domain, CreateInstagramWidgetRequest request)
        {
            var response = new CreateInstagramWidgetResponse();
            var shop = _widgetDbContext.Shop.FirstOrDefault(x => x.Domain == domain);
            if (shop == null)
            {
                throw new NotFoundException(domain);
            }

            var widgetEntity = _mapper.Map<InstagramWidgetEntity>(request);
            widgetEntity.Shops = shop;
            await _widgetDbContext.InstagramWidgets.AddAsync(widgetEntity);
            await _widgetDbContext.SaveChangesAsync();

            if (!string.IsNullOrEmpty(widgetEntity.Id))
            {
                response.WidgetId = widgetEntity.Id;
            }
            return response;
        }
        /// <summary>
        /// update widget
        /// </summary>
        /// <param name="key">key of widget</param>
        /// <param name="request">information widget update</param>
        public async Task<UpdateInstagramWidgetResponse> UpdateWidgetsAsync(string key, CreateInstagramWidgetRequest request)
        {
            var response = new UpdateInstagramWidgetResponse();
            var widget = await _widgetDbContext.InstagramWidgets.FirstOrDefaultAsync(x => x.Id == key);
            if (widget == null)
            {
                throw new NotFoundException(key);
            }
            var widgetEntity = _mapper.Map<InstagramWidgetEntity>(request);

            if(!widget.ValueSource.Equals(widgetEntity.ValueSource, StringComparison.CurrentCultureIgnoreCase) || widget.SourceType != widgetEntity.SourceType)
            {
                widget.ItemSorts = widgetEntity.ItemSorts;
                widget.DisableShowItems = widgetEntity.DisableShowItems;
            }

            widget.SourceType = widgetEntity.SourceType;
            widget.ValueSource = widgetEntity.ValueSource;
            widget.ModifyDate = DateTime.Now;
            widget.Setting = widgetEntity.Setting;
            widget.Header = widgetEntity.Header;
            widget.WidgetTitle = widgetEntity.WidgetTitle;

            var jobEntity = new JobEntity
            {
                Data = widgetEntity.ValueSource,
                Type = widgetEntity.SourceType
            };

            await _widgetDbContext.SaveChangesAsync();
            return response;
        }
        /// <summary>
        /// Delete widget
        /// </summary>
        /// <param name="key">key of widget</param>
        /// <returns></returns>
        public async Task<ResponseBase> DeleteAsync(string key)
        {
            var response = new ResponseBase();
            var widget = await _widgetDbContext.InstagramWidgets.Include(x => x.Products).FirstOrDefaultAsync(x => x.Id == key);
            if (widget == null)
            {
                throw new NotFoundException(key);
            }
            widget.Products.Clear();
            _widgetDbContext.InstagramWidgets.Remove(widget);
            await _widgetDbContext.SaveChangesAsync();
            await _performancesService.RemoveHistoryWidget(widget.Id, PerformanceTypeEnum.Instagram);

            return response;
        }
        /// <summary>
        /// Update product
        /// </summary>
        /// <param name="key">key of widget</param>
        /// <param name="products">information of list products</param>
        /// <returns></returns>
        public async Task<ResponseBase> UpdateProductAsync(string key, IEnumerable<ProductEntity> products)
        {
            var response = new ResponseBase();
            var widget = await _widgetDbContext.InstagramWidgets.Include(x => x.Products).FirstOrDefaultAsync(x => x.Id.Equals(key));
            if (widget == null)
            {
                throw new NotFoundException("Widget");
            }
            if (products.Any())
            {
                var shop = _widgetDbContext.Shop.FirstOrDefault(x => x.ID == products.First().ShopId);
                if (shop == null)
                {
                    throw new NotFoundException(products.First().ShopId.ToString());
                }

                var productOfWidget = _widgetDbContext.Product.Where(x => x.InstagramWidget.Id == widget.Id).ToList();
                if (productOfWidget.Any())
                {
                    _widgetDbContext.Product.RemoveRange(productOfWidget);
                    await _widgetDbContext.SaveChangesAsync();
                }

                var productEntities = products.Select(x => new ProductEntity
                {
                    Handle = x.Handle,
                    ProductId = x.Id,
                    Image = x.Image,
                    Prices = x.Prices,
                    Title = x.Title,
                    VariantName = x.VariantName,
                    Variants = x.Variants,
                    VariantSku = x.VariantSku,
                    Shops = shop,
                    InstagramWidget = widget
                }).ToList();
                await _widgetDbContext.Product.AddRangeAsync(productEntities);
            }
            else if (widget.Products.Any())
            {
                _widgetDbContext.Product.RemoveRange(widget.Products);
            }
            await _widgetDbContext.SaveChangesAsync();
            return response;
        }

        public IQueryable<InstagramViewModel> GetVideoJob(GetVideoByJobRequest request)
        {
            var response = Enumerable.Empty<InstagramViewModel>().AsQueryable();
            string type = request.Type == SourceTypeEnum.InstagramHashTag ? "insta-hashtag" : "insta-username";
            var pathFile = Path.Combine(Directory.GetCurrentDirectory(), "JsonData", "Video", type, $"{request.Data}.json");
            var JSON = File.ReadAllText(pathFile);
            if (!string.IsNullOrEmpty(JSON))
            {
                var videos = JsonConvert.DeserializeObject<IEnumerable<InstagramViewModel>>(JSON).OrderByDescending(x => x.TakenAt).ToList().AsQueryable();
                if (!string.IsNullOrEmpty(request.WidgetId))
                {
                    var widget = _widgetDbContext.InstagramWidgets.FirstOrDefault(x => x.Id.Equals(request.WidgetId));
                    if (widget != null)
                    {
                        videos = videos.BuildItems<InstagramViewModel>(widget.ItemSorts, null, widget.Setting.DisableTopNewItems, 
                            (outputItemSorts) =>
                            {
                                widget.ItemSorts = outputItemSorts;
                                _widgetDbContext.SaveChanges();
                            });
                    }
                }
                response = videos;
            }
            return response;
        }
        public IQueryable<InstagramViewModel> GetVideos(string widgetId)
        {
            var response = Enumerable.Empty<InstagramViewModel>().AsQueryable();
            try
            {
                var widget = _widgetDbContext.InstagramWidgets.FirstOrDefault(x => x.Id == widgetId);
                //Update sourcetype wrong from version before
                if(widget.SourceType == SourceTypeEnum.HashTag)
                {
                    widget.SourceType = SourceTypeEnum.InstagramHashTag;
                    _widgetDbContext.SaveChanges();
                }
                else if (widget.SourceType == SourceTypeEnum.UserName) {
                    widget.SourceType = SourceTypeEnum.InstagramUserName;
                    _widgetDbContext.SaveChanges();
                }
                if (widget != null)
                {
                    string type = widget.SourceType == SourceTypeEnum.InstagramHashTag ? "insta-hashtag" : "insta-username";
                    var pathFile = Path.Combine(Directory.GetCurrentDirectory(), "JsonData", "Video", type, $"{widget.ValueSource}.json");
                    var JSON = File.ReadAllText(pathFile);
                    if (!string.IsNullOrEmpty(JSON))
                    {
                        var videos = JsonConvert.DeserializeObject<IEnumerable<InstagramViewModel>>(JSON).OrderByDescending(x => x.TakenAt);
                        var disableTopNewItems = widget?.Setting?.DisableTopNewItems ?? false;
                        response = videos.BuildItems<InstagramViewModel>(widget.ItemSorts, widget.DisableShowItems, disableTopNewItems,
                            (outputItemSorts) =>
                            {
                                if (widget.ItemSorts.Count() != outputItemSorts.Count())
                                {
                                    widget.ItemSorts = outputItemSorts;
                                    _widgetDbContext.SaveChanges();
                                }
                            }).Take(widget.Setting.LimitItems);
                    }
                }
            }
            catch(Exception ex)
            {
                _logger.LogInfo(ex);
            }
            return response;
        }

        public async Task<AddJobResponse> AddJob(AddJobRequest request)
        {
            var jobExisted = _widgetDbContext.Job.FirstOrDefault(x => x.Data == request.Data && x.Type == request.Type);
            if(jobExisted == null)
            {
                var job = new JobEntity
                {
                    Data = request.Data,
                    Type = request.Type
                };

                await _widgetDbContext.Job.AddAsync(job);
                await _widgetDbContext.SaveChangesAsync();
            }
            return new AddJobResponse();
        }

        public async Task SetOptionShowItemsAsync(string widgetId, SetOptionShowItemsInstagramRequest request)
        {
            var widget = await _widgetDbContext.InstagramWidgets.FirstOrDefaultAsync(x => x.Id == widgetId);
            if(widget == null)
            {
                throw new NotFoundException($"{widgetId}");
            }
            widget.DisableShowItems = request.DisableShowItems;
            widget.ItemSorts = request.ItemSorts;
            widget.Setting.DisableTopNewItems = request.DisableTopNewItems;
            await _widgetDbContext.SaveChangesAsync();
        }
    }
}
