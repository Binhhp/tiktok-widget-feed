using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;
using System;
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
        [ODataRoute("Courses")]
        public IActionResult GetCourses()
        {
            var courses = _shopService.GetCources();
            return Ok(courses);
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("Banner")]
        public IActionResult GetBanner()
        {
            var banners = _shopService.GetBanners();
            return Ok(banners);
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("Posts")]
        public IActionResult GetPosts(DateTime startTime, DateTime endTime)
        {
            var posts = _shopService.GetPosts(startTime, endTime);
            return Ok(posts);
        }
    }
}
