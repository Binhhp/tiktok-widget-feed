using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TiktokWidget.Service.Dtos.Requests.TikTokWidgets;
using TiktokWidget.Service.Dtos.Requests.Widget;
using TiktokWidget.Service.Entities;
using TiktokWidget.Service.Interfaces;

namespace TiktokWidget.Controllers
{
    public class TikTokWidgetsController : ODataController
    {
        private readonly IWidgetService _widgetService;

        public TikTokWidgetsController(IWidgetService widgetService)
        {
            _widgetService = widgetService;
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("TikTokWidgets({key})")]
        public SingleResult<TikTokWidgetEntity> Get([FromODataUri] string key)
        {
            var result = _widgetService.GetById(key);
            return SingleResult.Create(result);
        }
        [HttpPost]
        [ODataRoute("TikTokWidgets({key})/UpdateProduct")]
        public async Task<IActionResult> UpdateProduct([FromODataUri] string key, [FromBody] AddTagProductRequest request)
        {
            await _widgetService.UpdateProductAsync(key, request.Products);
            return Ok();
        }

        [HttpPut]
        [ODataRoute("TikTokWidgets({key})")]
        public async Task<IActionResult> Put([FromODataUri] string key, [FromBody] UpdateWidgetRequest request)
        {
            var response = await _widgetService.UpdateAsync(key, request);
            return Ok(response);
        }

        [HttpDelete]
        [ODataRoute("TikTokWidgets({key})")]
        public async Task<IActionResult> Delete([FromODataUri] string key)
        {
            var response = await _widgetService.DeleteAsync(key);
            return Ok(response);
        }
    }
}
