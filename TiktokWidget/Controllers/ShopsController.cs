using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TiktokWidget.Common.Enums;
using TiktokWidget.Service.Dtos.Requests.InstagramWidgets;
using TiktokWidget.Service.Dtos.Requests.Shops;
using TiktokWidget.Service.Dtos.Requests.TikTokWidgets;
using TiktokWidget.Service.Dtos.Responses.Shop;
using TiktokWidget.Service.Dtos.Responses.TikTokWidgets;
using TiktokWidget.Service.Entities;
using TiktokWidget.Service.Interfaces;

namespace TiktokWidget.Controllers
{
    public class ShopsController : ODataController
    {
        private readonly IShopService _shopService;
        private readonly IProductService _productService;
        private readonly IWidgetService _widgetService;
        private readonly IInstagramWidgetService _instagramWidgetService;
        private readonly IPerformancesService _performancesService;
        public ShopsController(IShopService shopService, IProductService productService, IWidgetService widgetService, IInstagramWidgetService instagramWidgetService, IPerformancesService performancesService)
        {
            _shopService = shopService;
            _productService = productService;
            _widgetService = widgetService;
            _instagramWidgetService = instagramWidgetService;
            _performancesService = performancesService;
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("Shops({domain})")]
        public SingleResult<ShopEntity> Get([FromODataUri] string domain)
        {
            var result = _shopService.GetByDomain(domain);
            return SingleResult.Create(result);
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("Shops({domain})/GetWidgetCounts")]
        public IActionResult GetWidgetCounts([FromODataUri] string domain)
        {
            var result = _widgetService.GetCounts(domain);
            return Ok(result);
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("Shops({domain})/GetInstagramWidgetCounts")]
        public IActionResult GetInstagramWidgetCounts([FromODataUri] string domain)
        {
            var result = _instagramWidgetService.GetCounts(domain);
            return Ok(result);
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("Shops({domain})/GetThemes")]
        public IActionResult GetThemes([FromODataUri] string domain)
        {
            var result = _shopService.GetThemes(domain);
            return Ok(result);
        }

        [HttpPost]
        [ODataRoute("Shops")]
        public async Task<IActionResult> Post([FromBody] ShopCreateDto request)
        {
            await _shopService.CreateAsync(request);
            return Ok();
        }

        [HttpPut]
        [ODataRoute("Shops({domain})")]
        public async Task<IActionResult> Put([FromODataUri] string domain, [FromBody] ShopCreateDto request)
        {
            await _shopService.UpdateAsync(request, domain);
            return Ok();
        }

        [HttpDelete]
        [ODataRoute("Shops({domain})")]
        public async Task<IActionResult> Delete([FromODataUri] string domain)
        {
            await _shopService.DeleteAsync(domain);
            return Ok();
        }

        [HttpPost]
        [ODataRoute("Shops({domain})/UpdateShopConfiguration")]
        public async Task<IActionResult> UpdateShopConfiguration([FromODataUri] string domain, [FromBody] CreateShopConfigurationRequest request)
        {
            await _shopService.UpdateConfigurationAsync(domain, request);
            return Ok();
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("Shops({domain})/ShopConfiguration")]
        public SingleResult<ShopConfigurationEntity> GetShopConfiguration([FromODataUri] string domain)
        {
            return SingleResult.Create(_shopService.GetConfiguration(domain));
        }

        [HttpGet]
        //[EnableQuery]
        [ODataRoute("Shops({domain})/Products")]
        public PageResult<ProductEntity> GetProducts([FromODataUri] string domain)
        {
            var queryString = Request.Query;
            var pageIndex = "";
            if (queryString.TryGetValue("page", out var page))
            {
                pageIndex = page;
            }
            var response = _productService.Get(domain, pageIndex);
            var pageIndexes = _productService.GetPageIndex(domain);
            return new PageResult<ProductEntity>(response, null, pageIndexes);
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("Shops({domain})/TikTokWidgets")]
        public IActionResult GetWidgets([FromODataUri] string domain)
        {
            var result = _widgetService.Get(domain);
            return Ok(result);
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("Shops({domain})/InstagramWidgets")]
        public IActionResult GetInstagramWidgets([FromODataUri] string domain)
        {
            var result = _instagramWidgetService.Get(domain);
            return Ok(result);
        }

        [HttpPost]
        [ODataRoute("Shops({domain})/RegisterTikTokWidget")]
        public async Task<IActionResult> RegisterTikTokWidget([FromODataUri] string domain, [FromBody] WidgetCreateDto request)
        {
            var response = await _widgetService.CreateAsync(domain, request);
            return Ok(response);
        }

        [HttpPost]
        [ODataRoute("Shops({domain})/RegisterInstagramWidget")]
        public async Task<IActionResult> RegisterInstagramWidgets([FromODataUri] string domain, [FromBody] CreateInstagramWidgetRequest request)
        {
            var response = await _instagramWidgetService.CreateWidgetsAsync(domain, request);
            return Ok(response);
        }

        [HttpPost]
        [ODataRoute("Shops({domain})/AddJob")]
        public async Task<IActionResult> AddJob([FromODataUri] string domain, [FromBody] AddJobRequest request)
        {
            var response = await _widgetService.AddJob(request);
            return Ok(response);
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("Shops({domain})/Traffic")]
        public IActionResult GetTraffic([FromODataUri] string domain)
        {
            var result = _performancesService.Get(domain);
            return Ok(result);
        }
    }
}
