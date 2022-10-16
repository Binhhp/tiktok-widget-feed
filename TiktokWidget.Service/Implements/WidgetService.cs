using AutoMapper;
using System;
using System.Threading.Tasks;
using TiktokWidget.Service.Context;
using TiktokWidget.Service.Entities;
using TiktokWidget.Service.Interfaces;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using TiktokWidget.Common.Constants;
using System.Collections.Generic;
using TiktokWidget.Service.Models;
using Newtonsoft.Json;
using TiktokWidget.Service.Dtos.Requests.Widget;
using System.IO;
using TiktokWidget.Service.Dtos.Responses.TikTokWidgets;
using TiktokWidget.Service.Dtos.Requests.TikTokWidgets;
using TiktokWidget.Service.BusinessExceptions;
using Orichi.IoC.Logging.Models.Models;

namespace TiktokWidget.Service.Implements
{
    public class WidgetService : IWidgetService
    {
        private readonly WidgetFeedDbContext _context;
        private readonly IMapper _mapper;
        public WidgetService(WidgetFeedDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        /// <summary>
        /// Hàm tạo widget
        /// </summary>
        /// <returns></returns>
        public async Task<CreateWidgetResponse> CreateAsync(string domain, WidgetCreateDto request)
        {
            var response = new CreateWidgetResponse();
            var shop = _context.Shop.FirstOrDefault(x => x.Domain == domain);
            if (shop == null)
            {
                throw new NotFoundException(domain);
            }
            var widget = _context.Widgets.FirstOrDefault(x => x.WidgetTitle == request.WidgetTitle && x.Shops.Domain == domain);
            if (widget != null)
            {
                throw new ConflictException(request.WidgetTitle);
            }
            var widgetEntity = _mapper.Map<TikTokWidgetEntity>(request);
            var job = new JobEntity
            {
                Data = widgetEntity.ValueSource,
                Type = widgetEntity.SourceType
            };
            widgetEntity.Shops = shop;
            await _context.Job.AddAsync(job);
            await _context.Widgets.AddAsync(widgetEntity);
            await _context.SaveChangesAsync();
            return new CreateWidgetResponse(widgetEntity.Id);
        }

        /// <summary>
        /// Hàm xóa widget
        /// </summary>
        /// <returns></returns>
        public async Task<ResponseBase> DeleteAsync(string key)
        {
            var response = new ResponseBase();
            var widget = await _context.Widgets.Include(x => x.Products).FirstOrDefaultAsync(x => x.Id == key);
            if (widget == null)
            {
                throw new NotFoundException(key);
            }
            widget.Products.Clear();
            _context.Widgets.Remove(widget);
            await _context.SaveChangesAsync();
            return response;
        }

        /// <summary>
        /// Lấy widget theo id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public IQueryable<TikTokWidgetEntity> GetById(string key)
        {
            return _context.Widgets.Where(x => x.Id.Equals(key));
        }

        /// <summary>
        /// Hàm lấy danh sách
        /// </summary>
        /// <returns></returns>
        public IQueryable<TikTokWidgetEntity> Get(string domain)
        {
            var response = _context.Widgets.Where(x => x.Shops != null && x.Shops.Domain == domain).AsQueryable();
            return response;
        }


        /// <summary>
        /// Hàm cập nhật widget
        /// </summary>
        /// <returns></returns>
        public async Task<ResponseBase> UpdateAsync(string key, UpdateWidgetRequest request)
        {
            var response = new ResponseBase();
            var widget = await _context.Widgets.FirstOrDefaultAsync(x => x.Id == key);
            if (widget == null)
            {
                throw new NotFoundException(key);
            }
            var widgetEntity = _mapper.Map<TikTokWidgetEntity>(request);
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
            await _context.Job.AddAsync(jobEntity);
            await _context.SaveChangesAsync();
            return response;
        }
        /// <summary>
        /// Update tag product for widget
        /// </summary>
        /// <param name="key">Key of widget</param>
        /// <param name="productIds">Keys of tag product</param>
        public async Task<ResponseBase> UpdateProductAsync(string key, IEnumerable<ProductEntity> products)
        {
            var widget = await _context.Widgets.Include(x => x.Products).FirstOrDefaultAsync(x => x.Id.Equals(key));
            if (widget == null)
            {
                throw new NotFoundException("Widget");
            }
            if(products.Any())
            {
                var shop = _context.Shop.FirstOrDefault(x => x.ID == products.First().ShopId);
                if (shop == null) throw new Exception(ErrorMessage.InternalServerError);

                var productOfWidget = _context.Product.Where(x => x.Widget.Id == widget.Id).ToList();
                if (productOfWidget.Any())
                {
                    _context.Product.RemoveRange(productOfWidget);
                    await _context.SaveChangesAsync();
                }
                
                var productEntities = products.Select(x => new ProductEntity
                {
                    Handle = x.Handle,
                    Id = x.Id,
                    Image = x.Image,
                    Prices = x.Prices,
                    Title = x.Title,
                    VariantName = x.VariantName,
                    Variants = x.Variants,
                    VariantSku = x.VariantSku,
                    Shops = shop,
                    Widget = widget
                }).ToList();
                await _context.Product.AddRangeAsync(productEntities);
            }
            else if (widget.Products.Any())
            {
                _context.Product.RemoveRange(widget.Products);
            }
            await _context.SaveChangesAsync();
            return new ResponseBase();
        }

        public IQueryable<VideoTikTokModel> GetVideos(string widgetId)
        {
            var response = Enumerable.Empty<VideoTikTokModel>().AsQueryable();
            var widget = _context.Widgets.FirstOrDefault(x => x.Id == widgetId);
            if (widget == null)
            {
                return response;
            }
            string type = widget.SourceType == Common.Enums.SourceTypeEnum.HashTag ? "hashtag" : "username";
            var pathFile = Path.Combine(Directory.GetCurrentDirectory(), "JsonData", "Video", type, $"{widget.ValueSource}.json");
            var JSON = File.ReadAllText(pathFile);
            if (!string.IsNullOrEmpty(JSON))
            {
                response = JsonConvert.DeserializeObject<IEnumerable<VideoTikTokModel>>(JSON).ToList().AsQueryable();
            }
            return response;
        }

        public IQueryable<TikTokWidgetEntity> GetByIds(IEnumerable<string> widgetIds)
        {
            return _context.Widgets.Where(x => widgetIds.Any(w => w.Equals(x.Id)));
        }

        public int GetCounts(string domain)
        {
            return _context.Widgets.Include(x => x.Shops).Where(x => x.Shops.Domain.Equals(domain)).Count();
        }

        public async Task<AddJobResponse> AddJob(AddJobRequest request)
        {
            var job = new JobEntity
            {
                Data = request.Data,
                Type = request.Type
            };

            await _context.Job.AddAsync(job);
            await _context.SaveChangesAsync();
            return new AddJobResponse();
        }

        public IQueryable<VideoTikTokModel> GetVideoJob(GetVideoByJobRequest request)
        {
            var response = Enumerable.Empty<VideoTikTokModel>().AsQueryable();
            string type = request.Type == Common.Enums.SourceTypeEnum.HashTag ? "hashtag" : "username";
            var pathFile = Path.Combine(Directory.GetCurrentDirectory(), "JsonData", "Video", type, $"{request.Data}.json");
            var JSON = File.ReadAllText(pathFile);
            if (!string.IsNullOrEmpty(JSON))
            {
                response = JsonConvert.DeserializeObject<IEnumerable<VideoTikTokModel>>(JSON).ToList().AsQueryable();
            }
            return response;
        }
    }
}
