using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
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
        [ODataRoute("Shops({domain})/Posts")]
        public async Task<IActionResult> GetPosts([FromODataUri] string domain, DateTime startTime, DateTime endTime)
        {
            var posts = await _unitOfWork.Performance.GetPostPopular(domain, new Service.Dtos.Responses.Shops.AnalyzeWidgetRequest
            {
                StartTime = startTime,
                EndTime = endTime
            });
            return Ok(posts);
        }
    }
}
