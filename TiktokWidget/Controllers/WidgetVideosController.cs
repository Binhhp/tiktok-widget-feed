using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Mvc;
using TiktokWidget.Common.Enums;
using TiktokWidget.Service.Dtos.Requests.TikTokWidgets;
using TiktokWidget.Service.Interfaces;

namespace TiktokWidget.Controllers
{
    public class WidgetVideosController : ODataController
    {
        private readonly IWidgetService _widgetService;
        public WidgetVideosController(IWidgetService widgetService)
        {
            _widgetService = widgetService;
        }

        [HttpGet]
        [EnableQuery]
        public IActionResult Get([FromODataUri] string key)
        {
            var queryString = Request.Query;
            if (queryString.TryGetValue("data", out var data) && queryString.TryGetValue("type", out var type))
            {
                var response = _widgetService.GetVideoJob(new GetVideoByJobRequest
                {
                    Data = data,
                    Type = type.Equals("0") ? SourceTypeEnum.HashTag : SourceTypeEnum.UserName
                });
                return Ok(response);
            }
            var result = _widgetService.GetVideos(key);
            return Ok(result);
        }
    }
}
