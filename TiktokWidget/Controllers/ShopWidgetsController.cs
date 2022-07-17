using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using TiktokWidget.Service.Interfaces;

namespace TiktokWidget.Controllers
{
    public class ShopWidgetsController : ODataController
    {
        private readonly IWidgetService _widgetService;

        public ShopWidgetsController(IWidgetService widgetService)
        {
            _widgetService = widgetService;
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("ShopWidgets({key})")]
        public IActionResult Get([FromODataUri] string key)
        {
            var widgetIds = new List<string>();
            if (key.Contains(",")) widgetIds = key.Split(",").ToList();
            else widgetIds.Add(key);
            var result = _widgetService.GetByIds(widgetIds);
            return Ok(result);
        }
    }
}
