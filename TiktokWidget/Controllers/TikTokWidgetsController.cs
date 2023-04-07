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
        private readonly IUnitOfWork _unitOfWork;

        public TikTokWidgetsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("TikTokWidgets({key})")]
        public SingleResult<TikTokWidgetEntity> Get([FromODataUri] string key)
        {
            var result = _unitOfWork.TikTok.GetById(key);
            return SingleResult.Create(result);
        }
        [HttpPost]
        [ODataRoute("TikTokWidgets({key})/UpdateProduct")]
        public async Task<IActionResult> UpdateProduct([FromODataUri] string key, [FromBody] AddTagProductRequest request)
        {
            await _unitOfWork.TikTok.UpdateProductAsync(key, request.Products);
            return Ok();
        }

        [HttpPost]
        [ODataRoute("TikTokWidgets({key})/SetOptionShowItems")]
        public async Task<IActionResult> SetOptionShowItems([FromODataUri] string key, [FromBody] SetOptionShowItemsTiktokRequest request)
        {
            await _unitOfWork.TikTok.SetOptionShowItemsAsync(key, request);
            return Ok();
        }

        [HttpPut]
        [ODataRoute("TikTokWidgets({key})")]
        public async Task<IActionResult> Put([FromODataUri] string key, [FromBody] UpdateWidgetRequest request)
        {
            var response = await _unitOfWork.TikTok.UpdateAsync(key, request);
            return Ok(response);
        }

        [HttpDelete]
        [ODataRoute("TikTokWidgets({key})")]
        public async Task<IActionResult> Delete([FromODataUri] string key)
        {
            var response = await _unitOfWork.TikTok.DeleteAsync(key);
            return Ok(response);
        }
    }
}
