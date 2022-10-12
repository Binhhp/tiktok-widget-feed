using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using ShopifySharp;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using TiktokWidget.Common.Constants;
using TiktokWidget.Common.HttpLogging.Models;
using TiktokWidget.Service.Configurations;
using TiktokWidget.Service.Context;
using TiktokWidget.Service.Dtos.Requests.Shops;
using TiktokWidget.Service.Dtos.Responses.Shop;
using TiktokWidget.Service.Dtos.Responses.TikTokWidgets;
using TiktokWidget.Service.Entities;
using TiktokWidget.Service.Interfaces;

namespace TiktokWidget.Service.Implements
{
    public class ShopService : IShopService
    {
        private readonly WidgetFeedDbContext _context;
        private readonly IMapper _mapper;
        private readonly AppSettings _appSettings;
        public ShopService(WidgetFeedDbContext context, IMapper mapper, AppSettings appSettings)
        {
            _context = context;
            _mapper = mapper;
            _appSettings = appSettings;
        }

        public async Task<AddShopResponse> CreateAsync(ShopCreateDto request)
        {
            var result = new AddShopResponse();
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    var ShopById = await _context.Shop.FirstOrDefaultAsync(x => x.ShopID == request.ShopID);
                    if (ShopById != null)
                    {
                        throw new Exception(string.Format(ErrorMessage.Conflict, "Shop"));
                    }
                    var shopEntity = _mapper.Map<ShopEntity>(request);

                    shopEntity.ShopConfiguration = new ShopConfigurationEntity
                    {
                        Timezone = request.TimeZone,
                        IsEnabled = false  
                    };

                    await _context.Job.AddAsync(new JobEntity
                    {
                        Type = Common.Enums.SourceTypeEnum.Product,
                        Data = shopEntity.Domain
                    });
                    await _context.Shop.AddAsync(shopEntity);
                    await _context.SaveChangesAsync();
                    await transaction.CommitAsync();
                    result.Id = shopEntity.ID;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    throw ex;
                }
            }
            return result;
        }

        public async Task<ResponseBase> DeleteAsync(string domain)
        {
            var shop = await _context.Shop.FirstOrDefaultAsync(x => x.Domain == domain);
            if (shop == null)
            {
                throw new Exception(string.Format(ErrorMessage.NotFound, "Shop"));
            }
            _context.Shop.Remove(shop);

            await _context.SaveChangesAsync();
            return new ResponseBase();
        }
        public IQueryable<ShopEntity> Get()
        {
            var response = _context.Shop.AsQueryable();
            return response;
        }
        public IQueryable<ShopEntity> GetByDomain(string domain)
        {
            return _context.Shop.Where(x => x.Domain.Equals(domain));
        }

        public async Task<ResponseBase> UpdateAsync(ShopCreateDto request, string domain)
        {
            var shop = await _context.Shop.FirstOrDefaultAsync(x => x.Domain == domain);
            if (shop == null)
            {
                throw new Exception(string.Format(ErrorMessage.NotFound, "Shop"));
            }
            var shopEntity = _mapper.Map<ShopEntity>(request);

            shop.Domain = shopEntity.Domain;
            shop.Email = shopEntity.Email;
            shop.Token = shopEntity.Token;
            shop.StepSetup = shopEntity.StepSetup;
            shop.Currency = shopEntity.Currency;
            shop.GetData = shopEntity.GetData;
            shop.Status = shopEntity.Status;
            shop.ConfirmUrl = shopEntity.ConfirmUrl;
            shop.TrialDay = shopEntity.TrialDay;
            shop.ChargeId = shopEntity.ChargeId;
            shop.InstalledDate = shopEntity.InstalledDate;
            shop.Phone = shopEntity.Phone;
            shop.Email2 = shopEntity.Email2;
            shop.Country = shopEntity.Country;

            await _context.SaveChangesAsync();
            return new ResponseBase();
        }
        //Config shop for button widget

        public async Task UpdateConfigurationAsync(string domain, CreateShopConfigurationRequest request)
        {
            var shop = _context.Shop.Include(x => x.ShopConfiguration).FirstOrDefault(x => x.Domain.Equals(domain));
            if (shop == null)
            {
                throw new Exception(string.Format(ErrorMessage.NotFound, "Shop"));
            }

            if(shop.ShopConfiguration == null)
            {
                var shopConfig = _mapper.Map<ShopConfigurationEntity>(request);
                shopConfig.IsEnabled = true;
                shop.ShopConfiguration = shopConfig;
            }
            else
            {
                shop.ShopConfiguration.Image = request.Image;
                shop.ShopConfiguration.ButtonPosition = request.ButtonPosition;
                shop.ShopConfiguration.Theme = request.Theme;
                shop.ShopConfiguration.TikTokUserName = request.TikTokUserName;
                shop.ShopConfiguration.IsEnabled = request.IsEnabled;
            }
            await _context.SaveChangesAsync();
        }
        public IQueryable<ShopConfigurationEntity> GetConfiguration(string domain)
        {
            var shop = _context.Shop.FirstOrDefault(x => x.Domain.Equals(domain));
            if(shop == null)
            {
                return null;
            }
            return _context.ShopConfiguration.Where(x => x.ShopId == shop.ID);
        }

        public async Task ExternalAuthenticationAsync(string domain, string code)
        {
            ServicePointManager.Expect100Continue = true;
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            if (string.IsNullOrEmpty(domain))
            {
                throw new Exception(string.Format(ErrorMessage.RequireFieldNullEmpty, "Domain"));
            }
            string endpointHost = $"https://{domain}/admin/oauth/access_token";
            using (var client = new HttpClient())
            using (var request = new HttpRequestMessage(HttpMethod.Post, client.BaseAddress))
            {
                client.BaseAddress = new Uri(endpointHost);
                StringContent contentParams = new StringContent(string.Format(
                        "client_id={0}" +
                        "&code={1}" +
                        "&client_secret={2}"
                        , _appSettings.ShopifyApiKey
                        , code
                        , _appSettings.ShopifySecretKey), Encoding.UTF8, "application/x-www-form-urlencoded");

                request.Content = contentParams;
                var response = await client.SendAsync(request);
                if (response.StatusCode == HttpStatusCode.OK)
                {
                    var resultJson = await response.Content.ReadAsStringAsync();
                    var jsonConvert = JsonConvert.DeserializeObject<dynamic>(resultJson);
                    var access = Convert.ToString(jsonConvert.access_token);
                    var service = new ShopifySharp.ShopService(domain, access);
                    var shopInformation = await service.GetAsync();
                    var shopEntity = _context.Shop.FirstOrDefault(x => x.Domain.ToLower().Equals(shopInformation.Domain.ToLower()));
                    if (shopEntity == null)
                    {
                        shopEntity = new ShopEntity()
                        {
                            Domain = domain,
                            Token = access
                        };
                      
                        var resCreateShop = await CreateAsync(new ShopCreateDto()
                        {
                            Domain = domain,
                            Email = shopInformation.Email,
                            ShopID = shopInformation.Id.Value,
                            Token = access,
                            Currency = shopInformation.MoneyWithCurrencyFormat,
                            GetData = false,
                            Phone = shopInformation.Phone,
                            Email2 = shopInformation.CustomerEmail,
                            Country = shopInformation.CountryName,
                            PlanName = shopInformation.PlanName,
                            Status = 1,
                            TrialDay = 0,
                            TimeZone = shopInformation.IANATimezone,
                        });
                        shopEntity.ID = resCreateShop.Id;
                    }
                    else
                    {
                        shopEntity.Token = access;
                        await _context.SaveChangesAsync();
                    }
                    try
                    {
                        var service_webhook = new WebhookService(shopEntity.Domain, shopEntity.Token);
                        var hook = new Webhook()
                        {
                            Address = "https://" + _appSettings.WebhookUrl + "/Home/WebhookShopUninstalled?ShopID=" + shopEntity.ID,
                            CreatedAt = DateTime.Now,
                            Format = "json",
                            Topic = "app/uninstalled",
                        };
                        var webHook = await service_webhook.CreateAsync(hook);
                    }
                    catch (Exception)
                    {
                    }
                   
                }
                else
                {
                    throw new Exception(ErrorMessage.HandlerCallbackError);
                }
            }
        }

        public async Task Test(string domain)
        {
            ServicePointManager.Expect100Continue = true;
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

            var shopEntity = _context.Shop.FirstOrDefault(x => x.Domain.Equals(domain));

            var service = new WebhookService(shopEntity.Domain, shopEntity.Token);

            var list = await service.ListAsync();

            try
            {
                var service_webhook = new WebhookService(shopEntity.Domain, shopEntity.Token);
                var hook = new Webhook()
                {
                    Address = "https://" + _appSettings.WebhookUrl + "/Home/WebhookShopUninstalled?ShopID=" + shopEntity.ID,
                    CreatedAt = DateTime.Now,
                    Format = "json",
                    Topic = "app/uninstalled",
                };
                var webHook = await service_webhook.CreateAsync(hook);
            }
            catch 
            {
            }

        }

        public IQueryable<Theme> GetThemes(string domain)
        {
            var response = Enumerable.Empty<Theme>().AsQueryable();
            var shopObj = GetByDomain(domain).FirstOrDefault();
            if(shopObj != null)
            {
                var themeService = new ThemeService(shopObj.Domain, shopObj.Token);
                response = themeService.ListAsync().GetAwaiter().GetResult().AsQueryable();
            }
            return response;
        }
    }
}
