using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using TiktokWidget.Common.Enums;
using TiktokWidget.Service.Interfaces;

namespace TiktokWidget.Controllers
{
    public class ShopWidgetsController : ODataController
    {
        private readonly IUnitOfWork _unitOfWork;

        public ShopWidgetsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("ShopWidgets({key})")]
        public IActionResult Get([FromODataUri] string key, WidgetTypeEnum type = WidgetTypeEnum.TikTok)
        {
            var widgetIds = new List<string>();
            if (key.Contains(",")) widgetIds = key.Split(",").ToList();
            else widgetIds.Add(key);
            
            if(type == WidgetTypeEnum.TikTok)
            {
                var result = _unitOfWork.TikTok.GetByIds(widgetIds);
                return Ok(result);
            }
            else
            {
                var result = _unitOfWork.Instagram.GetByIds(widgetIds);
                return Ok(result);
            }
        }
    }
}
