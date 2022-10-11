using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TiktokWidget.Service.Context.Entities;
using TiktokWidget.Service.Dtos.Requests.InstagramWidgets;
using TiktokWidget.Service.Dtos.Requests.TikTokWidgets;
using TiktokWidget.Service.Implements;

namespace TiktokWidget.Controllers
{
    public class InstagramWidgetsController : ODataController
    {
        private readonly InstagramWidgetService _instagramWidgetService;

        public InstagramWidgetsController(InstagramWidgetService instagramWidgetService)
        {
            _instagramWidgetService = instagramWidgetService;
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("InstagramWidgets({key})")]
        public SingleResult<InstagramWidgetEntity> Get([FromODataUri] string key)
        {
            var result = _instagramWidgetService.GetById(key);
            return SingleResult.Create(result);
        }

        [HttpPost]
        [ODataRoute("InstagramWidgets({key})/UpdateProduct")]
        public async Task<IActionResult> UpdateProduct([FromODataUri] string key, [FromBody] AddTagProductRequest request)
        {
            await _instagramWidgetService.UpdateProductAsync(key, request.Products);
            return Ok();
        }

        [HttpDelete]
        [ODataRoute("InstagramWidgets({key})")]
        public async Task<IActionResult> Delete([FromODataUri] string key)
        {
            var response = await _instagramWidgetService.DeleteAsync(key);
            return Ok(response);
        }

        [HttpPut]
        [ODataRoute("InstagramWidgets({key})")]
        public async Task<IActionResult> Put([FromODataUri] string key, [FromBody] CreateInstagramWidgetRequest request)
        {
            var response = await _instagramWidgetService.UpdateWidgetsAsync(key, request);
            return Ok(response);
        }
    }
}
