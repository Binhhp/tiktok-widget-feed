using Microsoft.AspNetCore.Mvc;
using Orichi.IoC.Logging;
using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using TiktokWidget.Service.Configurations;
using TiktokWidget.Service.Interfaces;

namespace TiktokWidget.Controllers
{
    public class HomeController : Controller
    {
        private readonly IShopService _shopService;
        private readonly ILoggerProvider _logger;
        private readonly AppSettings _appSettings;
        public HomeController(IShopService shopService, AppSettings appSettings, ILoggerProvider logger)
        {
            _shopService = shopService;
            _appSettings = appSettings;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Install(string shop, params string[] values)
        {
            ServicePointManager.Expect100Continue = true;
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

            if (string.IsNullOrEmpty(shop))
            {
                return Redirect("~/");
            }
            var shopobj = _shopService.GetByDomain(shop).FirstOrDefault();
            if (shopobj == null)
            {
                var redirectUri = $"https://{shop}/admin/oauth/authorize?client_id={_appSettings.ShopifyApiKey}&scope=read_products,read_script_tags,write_script_tags,read_themes,write_themes&redirect_uri=https://{HttpContext.Request.Host.Value}/Home/Authentication";
                return Redirect(redirectUri);
            }
            return Redirect($"~/?shop={shop}");
        }

        [HttpGet]
        public async Task<IActionResult> Authentication(string shop, string code, params string[] values)
        {
            try
            {
                await _shopService.ExternalAuthenticationAsync(shop, code);
                return Redirect($"~/?shop={shop}");
            }
            catch(Exception ex)
            {
                _logger.LogInfo(ex);
               return Redirect($"~/");
            }
        }

        public async Task<IActionResult> Test(string shop)
        {
            await _shopService.Test(shop);
            return null;
          
        }
    }
}
