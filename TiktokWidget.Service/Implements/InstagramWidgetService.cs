using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Orichi.IoC.Logging.Models.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using TiktokWidget.Service.BusinessExceptions;
using TiktokWidget.Service.Context;
using TiktokWidget.Service.Dtos.Requests.InstagramWidgets;
using TiktokWidget.Service.Dtos.Requests.TikTokWidgets;
using TiktokWidget.Service.Dtos.Responses.InstagramWidgets;
using TiktokWidget.Service.Entities;
using TiktokWidget.Service.Interfaces;
using TiktokWidget.Service.Models;
using TiktokWidget.Service.ViewModels;

namespace TiktokWidget.Service.Implements
{
    public class InstagramWidgetService : IInstagramWidgetService
    {
        private readonly WidgetFeedDbContext _widgetDbContext;
        private readonly IMapper _mapper;

        public InstagramWidgetService(WidgetFeedDbContext widgetDbContext, IMapper mapper)
        {
            _widgetDbContext = widgetDbContext;
            _mapper = mapper;
        }
        /// <summary>
        /// get list widget
        /// </summary>
        /// <param name="domain">domain of shop</param>
        public IQueryable<InstagramWidgetEntity> Get(string domain)
        {
            var resposne = _widgetDbContext.InstagramWidgets.Where(x => x.Shops != null && x.Shops.Domain.Equals(domain));
            return resposne;
        }
        /// <summary>
        /// get by single id
        /// </summary>
        /// <param name="key">key of widget</param>
        public IQueryable<InstagramWidgetEntity> GetById(string key)
        {
            return _widgetDbContext.InstagramWidgets.Where(x => x.Id.Equals(key));
        }
        /// <summary>
        /// get widgets by ids
        /// </summary>
        /// <param name="widgetIds">list ids</param>
        public IQueryable<InstagramWidgetEntity> GetByIds(IEnumerable<string> widgetIds)
        {
            return _widgetDbContext.InstagramWidgets.Where(x => widgetIds.Any(w => w.Equals(x.Id)));
        }
        /// <summary>
        /// get number of widgets
        /// </summary>
        /// <param name="domain">domain of shop client</param>
        public int GetCounts(string domain)
        {
            return _widgetDbContext.InstagramWidgets.Where(x => x.Shops != null && x.Shops.Domain.Equals(domain)).Count();
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
            //var response = Enumerable.Empty<InstagramViewModel>().AsQueryable();
            //string type = request.Type == Common.Enums.SourceTypeEnum.HashTag ? "hashtag" : "username";
            //var pathFile = Path.Combine(Directory.GetCurrentDirectory(), "JsonData", "Video", type, $"{request.Data}.json");
            //var JSON = File.ReadAllText(pathFile);
            //if (!string.IsNullOrEmpty(JSON))
            //{
            //    response = JsonConvert.DeserializeObject<IEnumerable<InstagramViewModel>>(JSON).ToList().AsQueryable();
            //}
            //return response;
            return InstagramVideoSeedData.Seed();
        }
        public IQueryable<InstagramViewModel> GetVideos(string widgetId)
        {
            //var response = Enumerable.Empty<InstagramViewModel>().AsQueryable();
            //string type = request.Type == Common.Enums.SourceTypeEnum.HashTag ? "hashtag" : "username";
            //var pathFile = Path.Combine(Directory.GetCurrentDirectory(), "JsonData", "Video", type, $"{request.Data}.json");
            //var JSON = File.ReadAllText(pathFile);
            //if (!string.IsNullOrEmpty(JSON))
            //{
            //    response = JsonConvert.DeserializeObject<IEnumerable<InstagramViewModel>>(JSON).ToList().AsQueryable();
            //}
            //return response;
            return InstagramVideoSeedData.Seed();
        }
    }
}
