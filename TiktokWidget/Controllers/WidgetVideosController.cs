using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Mvc;
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
            var result = _widgetService.GetVideos(key);
            return Ok(result);
        }
    }
}
