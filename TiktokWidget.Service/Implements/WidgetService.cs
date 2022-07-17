using AutoMapper;
using System;
using System.Threading.Tasks;
using TiktokWidget.Service.Context;
using TiktokWidget.Service.Dtos;
using TiktokWidget.Service.Entities;
using TiktokWidget.Service.Interfaces;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using TiktokWidget.Common.Constants;
using System.Collections.Generic;
using TiktokWidget.Service.Models;
using System.Net.Http;
using Newtonsoft.Json;
using TiktokWidget.Service.Dtos.Response;
using TiktokWidget.Service.Dtos.Responses;
using TiktokWidget.Service.Dtos.Requests.Widget;
using TiktokWidget.Common.HttpLogging.Models;

namespace TiktokWidget.Service.Implements
{
    public class WidgetService : IWidgetService
    {
        private readonly TiktokWidgetDbContext _context;
        private readonly IMapper _mapper;
        private const string HostGetVideos = "http://14.225.5.25:888";
        public WidgetService(TiktokWidgetDbContext context, IMapper mapper)
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
                response.Success = false;
                response.StatusCode = (int)ResponseCode.NotFound;
                response.Errors = new List<ErrorDetail>
                {
                    new ErrorDetail
                    {
                        ErrorCode = ResponseCode.NotFound,
                        ErrorMessage = string.Format(ErrorMessage.NotFound)
                    }
                };
                return response;
            }
            var widget = _context.Widgets.FirstOrDefault(x => x.WidgetTitle == request.WidgetTitle && x.Shops.Domain == domain);
            if(widget != null)
            {
                response.Success = false;
                response.StatusCode = (int)ResponseCode.Conflict;
                response.Errors = new List<ErrorDetail>
                {
                    new ErrorDetail
                    {
                        ErrorCode = ResponseCode.Conflict,
                        ErrorMessage = string.Format(ErrorMessage.Conflict, "Widget")
                    }
                };
                return response;
            }
            var widgetEntity = _mapper.Map<WidgetEntity>(request);
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
            if(widget == null)
            {
                response.Success = false;
                response.StatusCode = (int)ResponseCode.NotFound;
                response.Errors = new List<ErrorDetail>
                {
                    new ErrorDetail
                    {
                        ErrorCode = ResponseCode.NotFound,
                        ErrorMessage = string.Format(ErrorMessage.NotFound, key)
                    }
                };
                return response;
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
        public IQueryable<WidgetEntity> GetById(string key)
        {
            return _context.Widgets.Where(x => x.Id.Equals(key));
        }

        /// <summary>
        /// Hàm lấy danh sách
        /// </summary>
        /// <returns></returns>
        public IQueryable<WidgetEntity> Get(string domain)
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
                response.Success = false;
                response.StatusCode = (int)ResponseCode.NotFound;
                response.Errors = new List<ErrorDetail>
                {
                    new ErrorDetail
                    {
                        ErrorCode = ResponseCode.NotFound,
                        ErrorMessage = string.Format(ErrorMessage.NotFound, key)
                    }
                };
                return response;
            }
            var widgetEntity = _mapper.Map<WidgetEntity>(request);
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
        public async Task<ResponseBase> UpdateProductAsync(string key, IEnumerable<string> productIds)
        {
            if(productIds.Count() > 1) throw new Exception(string.Format(ErrorMessage.InvalidMaxLength, "ProductIds"));
            var widget = await _context.Widgets.Include(x => x.Products).FirstOrDefaultAsync(x => x.Id.Equals(key));
            if (widget == null)
            {
                throw new Exception(string.Format(ErrorMessage.NotFound, "Widget"));
            }
            if(productIds.Count() == 0)
            {
                widget.Products.Clear();
            }
            else
            {
                var products = _context.Product.Where(x => productIds.Any(p => p == x.Id)).ToList();
                if (products != null && products.Count() > 0)
                {
                    widget.Products = products;
                }
            }
            await _context.SaveChangesAsync();
            return new ResponseBase();
        }

        public IQueryable<VideoTikTokModel> GetVideos(string widgetId)
        {
            var response = Enumerable.Empty<VideoTikTokModel>().AsQueryable();
            var widget = _context.Widgets.FirstOrDefault(x => x.Id == widgetId);
            if(widget == null)
            {
                return response;
            }
            string type = widget.SourceType == Common.Enums.SourceTypeEnum.HashTag ? "hashtag" : "username";
            string urlRequest = $"{HostGetVideos}/{type}/{widget.ValueSource}.json";
            var httpClient = new HttpClient();
            var res = httpClient.GetAsync(urlRequest).GetAwaiter().GetResult();
            var JSON = res.Content.ReadAsStringAsync().GetAwaiter().GetResult();
            response = JsonConvert.DeserializeObject<IEnumerable<VideoTikTokModel>>(JSON).ToList().AsQueryable();
            return response;
        }

        public IQueryable<WidgetEntity> GetByIds(IEnumerable<string> widgetIds)
        {
            return _context.Widgets.Where(x => widgetIds.Any(w => w.Equals(x.Id)));
        }
    }
}
