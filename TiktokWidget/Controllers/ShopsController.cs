using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using TiktokWidget.Service.Dtos;
using TiktokWidget.Service.Dtos.Requests;
using TiktokWidget.Service.Entities;
using TiktokWidget.Service.Interfaces;

namespace TiktokWidget.Controllers
{
    public class ShopsController : ODataController
    {
        private readonly IShopService _shopService;
        private readonly IProductService _productService;
        private readonly IWidgetService _widgetService;
        public ShopsController(IShopService shopService, IProductService productService, IWidgetService widgetService)
        {
            _shopService = shopService;
            _productService = productService;
            _widgetService = widgetService;
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
        [ODataRoute("Shops({domain})/Widgets")]
        public IActionResult GetWidgets([FromODataUri] string domain)
        {
            var result = _widgetService.Get(domain);
            return Ok(result);
        }

        [HttpPost]
        [ODataRoute("Shops({domain})/RegisterWidget")]
        public async Task<IActionResult> RegisterWidget([FromODataUri] string domain, [FromBody] WidgetCreateDto request)
        {
            var response = await _widgetService.CreateAsync(domain, request);
            if (!response.Success)
            {
                return NotFound(response);
            }
            return Ok(response);
        }


        [HttpPost]
        [ODataRoute("Shops({domain})/AddJob")]
        public async Task<IActionResult> AddJob([FromODataUri] string domain, [FromBody] AddJobRequest request)
        {
            var response = await _widgetService.AddJob(request);
            return Ok(response);
        }
    }
}
