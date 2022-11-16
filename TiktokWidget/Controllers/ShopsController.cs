using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TiktokWidget.Service.Dtos.Requests.InstagramWidgets;
using TiktokWidget.Service.Dtos.Requests.Shops;
using TiktokWidget.Service.Dtos.Requests.TikTokWidgets;
using TiktokWidget.Service.Dtos.Responses.Shop;
using TiktokWidget.Service.Dtos.Responses.Shops;
using TiktokWidget.Service.Dtos.Responses.TikTokWidgets;
using TiktokWidget.Service.Entities;
using TiktokWidget.Service.Interfaces;

namespace TiktokWidget.Controllers
{
    public class ShopsController : ODataController
    {
        private readonly IUnitOfWork _unitOfWork;
        public ShopsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("Shops({domain})")]
        public SingleResult<ShopEntity> Get([FromODataUri] string domain)
        {
            var result = _unitOfWork.Shop.GetByDomain(domain);
            return SingleResult.Create(result);
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("Shops({domain})/GetWidgetCounts")]
        public IActionResult GetWidgetCounts([FromODataUri] string domain)
        {
            var result = _unitOfWork.TikTok.GetCounts(domain);
            return Ok(result);
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("Shops({domain})/GetInstagramWidgetCounts")]
        public IActionResult GetInstagramWidgetCounts([FromODataUri] string domain)
        {
            var result = _unitOfWork.Instagram.GetCounts(domain);
            return Ok(result);
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("Shops({domain})/GetThemes")]
        public IActionResult GetThemes([FromODataUri] string domain)
        {
            var result = _unitOfWork.Shop.GetThemes(domain);
            return Ok(result);
        }

        [HttpPost]
        [ODataRoute("Shops")]
        public async Task<IActionResult> Post([FromBody] ShopCreateDto request)
        {
            await _unitOfWork.Shop.CreateAsync(request);
            return Ok();
        }

        [HttpPut]
        [ODataRoute("Shops({domain})")]
        public async Task<IActionResult> Put([FromODataUri] string domain, [FromBody] ShopCreateDto request)
        {
            await _unitOfWork.Shop.UpdateAsync(request, domain);
            return Ok();
        }

        [HttpDelete]
        [ODataRoute("Shops({domain})")]
        public async Task<IActionResult> Delete([FromODataUri] string domain)
        {
            await _unitOfWork.Shop.DeleteAsync(domain);
            return Ok();
        }

        [HttpPost]
        [ODataRoute("Shops({domain})/UpdateShopConfiguration")]
        public async Task<IActionResult> UpdateShopConfiguration([FromODataUri] string domain, [FromBody] CreateShopConfigurationRequest request)
        {
            await _unitOfWork.Shop.UpdateConfigurationAsync(domain, request);
            return Ok();
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("Shops({domain})/ShopConfiguration")]
        public SingleResult<ShopConfigurationEntity> GetShopConfiguration([FromODataUri] string domain)
        {
            return SingleResult.Create(_unitOfWork.Shop.GetConfiguration(domain));
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
            var response = _unitOfWork.Product.Get(domain, pageIndex);
            var pageIndexes = _unitOfWork.Product.GetPageIndex(domain);
            return new PageResult<ProductEntity>(response, null, pageIndexes);
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("Shops({domain})/TikTokWidgets")]
        public IActionResult GetWidgets([FromODataUri] string domain)
        {
            var result = _unitOfWork.TikTok.Get(domain);
            return Ok(result);
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("Shops({domain})/InstagramWidgets")]
        public IActionResult GetInstagramWidgets([FromODataUri] string domain)
        {
            var result = _unitOfWork.Instagram.Get(domain);
            return Ok(result);
        }

        [HttpPost]
        [ODataRoute("Shops({domain})/RegisterTikTokWidget")]
        public async Task<IActionResult> RegisterTikTokWidget([FromODataUri] string domain, [FromBody] WidgetCreateDto request)
        {
            var response = await _unitOfWork.TikTok.CreateAsync(domain, request);
            return Ok(response);
        }

        [HttpPost]
        [ODataRoute("Shops({domain})/RegisterInstagramWidget")]
        public async Task<IActionResult> RegisterInstagramWidgets([FromODataUri] string domain, [FromBody] CreateInstagramWidgetRequest request)
        {
            var response = await _unitOfWork.Instagram.CreateWidgetsAsync(domain, request);
            return Ok(response);
        }

        [HttpPost]
        [ODataRoute("Shops({domain})/AddJob")]
        public async Task<IActionResult> AddJob([FromODataUri] string domain, [FromBody] AddJobRequest request)
        {
            var response = await _unitOfWork.TikTok.AddJob(request);
            return Ok(response);
        }

        [HttpPost]
        [ODataRoute("Shops({domain})/AddJobInstagram")]
        public async Task<IActionResult> AddJobInstagram([FromODataUri] string domain, [FromBody] AddJobRequest request)
        {
            var response = await _unitOfWork.Instagram.AddJob(request);
            return Ok(response);
        }

        [HttpPost]
        [ODataRoute("Shops({domain})/Analytics")]
        public async Task<IActionResult> AnalyzeWidgets([FromODataUri] string domain, [FromBody] AnalyzeWidgetRequest request)
        {
            var result = await _unitOfWork.Performance.Analytics(domain, request);
            return Ok(result);
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("Shops({domain})/Traffic")]
        public IActionResult GetTraffic([FromODataUri] string domain)
        {
            var result = _unitOfWork.Performance.Get(domain);
            return Ok(result);
        }

        [HttpPost]
        [ODataRoute("Shops({domain})/Feedback")]
        public async Task<IActionResult> PostFeedback([FromODataUri] string domain, [FromBody] PostFeedbackRequest request)
        {
            var result = await _unitOfWork.Shop.FeedbackAsync(domain, request);
            return Ok(result);
        }
    }
}
