using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Orichi.IoC.Constants;
using Orichi.IoC.Logging;
using Orichi.IoC.Logging.Models;
using Orichi.IoC.Logging.Models.Models;
using ShopifySharp;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using TiktokWidget.Common.Constants;
using TiktokWidget.Common.Utils;
using TiktokWidget.Service.Context;
using TiktokWidget.Service.Dtos.Requests.TikTokWidgets;
using TiktokWidget.Service.Entities;
using TiktokWidget.Service.Interfaces;

namespace TiktokWidget.Service.Implements
{
    public class ProductService : IProductService
    {
        private readonly WidgetFeedDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IShopService _shopService;
        private readonly ILoggerProvider _logger;
        public ProductService(
            WidgetFeedDbContext dbContext,
            IMapper mapper,
            IShopService shopService,
            ILoggerProvider logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _shopService = shopService;
            _logger = logger;
        }
        public async Task AddAsync(IEnumerable<ProductEntity> products)
        {
            await _dbContext.Product.AddRangeAsync(products);
            await _dbContext.SaveChangesAsync();
        }
        public async Task<ResponseBase> AddAsync(AddProductRequest request)
        {
            var response = new ResponseBase();
            var errors = new List<ErrorDetail>();
            var productEntities = request.Products.Select(x =>
            {
                var checkProduct = _dbContext.Product.Any(y => y.Title.Equals(x.Title));
                if (checkProduct)
                {
                    errors.Add(new ErrorDetail
                    {
                        ErrorCode = ResponseCode.Conflict,
                        ErrorMessage = string.Format(ErrorMessage.Conflict, x.Title)
                    });
                    return null;
                }
                var productEntity = _mapper.Map<ProductEntity>(x);
                return productEntity;
            }).Where(x => x != null);

            if (productEntities.Count() > 0)
            {
                await _dbContext.Product.AddRangeAsync(productEntities);
                await _dbContext.SaveChangesAsync();
            }
            if (errors.Count() > 0)
            {
                response.StatusCode = (int)HttpStatusCode.BadRequest;
                response.Errors = errors;
            }
            return response;
        }

        public IQueryable<ProductEntity> Get(string domain, string pageIndex = "")
        {
            var products = Enumerable.Empty<ProductEntity>().AsQueryable();
            try
            {
                if (!string.IsNullOrEmpty(pageIndex))
                {
                    var shopEntity = _shopService.GetByDomain(domain).FirstOrDefault();
                    if (shopEntity == null)
                    {
                        throw new Exception(string.Format(ErrorMessage.NotFound, $"Shop {domain}"));
                    }
                    var pathFile = Path.Combine(Directory.GetCurrentDirectory(), "JsonData", "Product", domain, $"{int.Parse(pageIndex) - 1}.json");
                    var JSON = File.ReadAllText(pathFile);
                    var response = JsonConvert.DeserializeObject<IEnumerable<Product>>(JSON).ToList();
                    if (response != null)
                    {
                        products = response.Select(x => new ProductEntity
                        {
                            Id = EncodingHelper.Base64Encode($"{domain}-{x.Id}"),
                            Handle = x.Handle,
                            Image = x.Images?.FirstOrDefault()?.Src ?? "",
                            Title = x.Title,
                            VariantName = x.Variants?.FirstOrDefault()?.Title ?? "",
                            Variants = x.Variants?.FirstOrDefault()?.FulfillmentService ?? "",
                            VariantSku = x.Variants?.FirstOrDefault()?.InventoryManagement ?? "",
                            ShopId = shopEntity.ID,
                            Prices = x.Variants?.FirstOrDefault()?.Price.ToString() ?? "",
                        }).AsQueryable();
                    }
                }
            }
            catch(Exception ex)
            {
                _logger.LogInfo(ex);
            }
            return products;
        }

        public IQueryable<ProductEntity> GetById(string key)
        {
            return _dbContext.Product.Where(x => x.Id == key);
        }

        public int GetPageIndex(string domain)
        {
            var pageIndexs = Directory.GetFiles(Path.Combine(Directory.GetCurrentDirectory(), "JsonData", "Product", domain), "*.json");
            return pageIndexs.Length;
        }

        public async Task<ResponseBase> RemoveAsync(string key)
        {
            var productEntity = await _dbContext.Product.FirstOrDefaultAsync(x => x.Id == key);
            if (productEntity == null)
            {
                throw new Exception(string.Format(ErrorMessage.NotFound, "Product"));
            }
            _dbContext.Product.Remove(productEntity);

            await _dbContext.SaveChangesAsync();
            return new ResponseBase();
        }

        public async Task<ResponseBase> UpdateAsync(string key, UpdateProductRequest request)
        {
            var productEntity = await _dbContext.Product.FirstOrDefaultAsync(x => x.Id == key);
            if (productEntity == null)
            {
                throw new Exception(string.Format(ErrorMessage.NotFound, "Product"));
            }
            productEntity.Title = request.Title;
            productEntity.Prices = request.Prices;
            productEntity.Variants = request.Variants;
            productEntity.VariantSku = request.VariantSku;
            productEntity.VariantName = request.VariantName;
            productEntity.Handle = request.Handle;
            productEntity.Image = request.Image;
            await _dbContext.SaveChangesAsync();
            return new ResponseBase();
        }
    }
}
