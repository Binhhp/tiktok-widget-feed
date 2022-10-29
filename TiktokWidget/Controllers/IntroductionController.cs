using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;
using TiktokWidget.Service.Interfaces;

namespace TiktokWidget.Controllers
{
    public class IntroductionController : ODataController
    {
        private readonly IShopService _shopService;

        public IntroductionController(IShopService shopService)
        {
            _shopService = shopService;
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("Posts")]
        public IActionResult GetPosts()
        {
            var posts = _shopService.GetPosts();
            return Ok(posts);
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("Banner")]
        public IActionResult GetBanner()
        {
            var banners = _shopService.GetBanners();
            return Ok(banners);
        }
    }
}
