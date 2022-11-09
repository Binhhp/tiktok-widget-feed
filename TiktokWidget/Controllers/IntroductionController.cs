using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;
using System;
using TiktokWidget.Service.Interfaces;

namespace TiktokWidget.Controllers
{
    public class IntroductionController : ODataController
    {
        private readonly IUnitOfWork _unitOfWork;

        public IntroductionController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("Courses")]
        public IActionResult GetCourses()
        {
            var courses = _unitOfWork.Shop.GetCources();
            return Ok(courses);
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("Banner")]
        public IActionResult GetBanner()
        {
            var banners = _unitOfWork.Shop.GetBanners();
            return Ok(banners);
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("Posts")]
        public IActionResult GetPosts(DateTime startTime, DateTime endTime)
        {
            var posts = _unitOfWork.Shop.GetPosts(startTime, endTime);
            return Ok(posts);
        }
    }
}
