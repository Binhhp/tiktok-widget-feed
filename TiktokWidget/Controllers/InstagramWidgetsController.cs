using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TiktokWidget.Service.Dtos.Requests.InstagramWidgets;
using TiktokWidget.Service.Dtos.Requests.TikTokWidgets;
using TiktokWidget.Service.Entities;
using TiktokWidget.Service.Interfaces;

namespace TiktokWidget.Controllers
{
    public class InstagramWidgetsController : ODataController
    {
        private readonly IUnitOfWork _unitOfWork;
        public InstagramWidgetsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("InstagramWidgets({key})")]
        public SingleResult<InstagramWidgetEntity> Get([FromODataUri] string key)
        {
            var result = _unitOfWork.Instagram.GetById(key);
            return SingleResult.Create(result);
        }

        [HttpPost]
        [ODataRoute("InstagramWidgets({key})/UpdateProduct")]
        public async Task<IActionResult> UpdateProduct([FromODataUri] string key, [FromBody] AddTagProductRequest request)
        {
            await _unitOfWork.Instagram.UpdateProductAsync(key, request.Products);
            return Ok();
        }

        [HttpPost]
        [ODataRoute("InstagramWidgets({key})/SetOptionShowItems")]
        public async Task<IActionResult> SetOptionShowItems([FromODataUri] string key, [FromBody] SetOptionShowItemsInstagramRequest request)
        {
            await _unitOfWork.Instagram.SetOptionShowItemsAsync(key, request);
            return Ok();
        }

        [HttpDelete]
        [ODataRoute("InstagramWidgets({key})")]
        public async Task<IActionResult> Delete([FromODataUri] string key)
        {
            var response = await _unitOfWork.Instagram.DeleteAsync(key);
            return Ok(response);
        }

        [HttpPut]
        [ODataRoute("InstagramWidgets({key})")]
        public async Task<IActionResult> Put([FromODataUri] string key, [FromBody] CreateInstagramWidgetRequest request)
        {
            var response = await _unitOfWork.Instagram.UpdateWidgetsAsync(key, request);
            return Ok(response);
        }
    }
}
