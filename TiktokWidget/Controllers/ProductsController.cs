using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TiktokWidget.Service.Dtos.Requests.TikTokWidgets;
using TiktokWidget.Service.Interfaces;

namespace TiktokWidget.Controllers
{
    public class ProductsController : ODataController
    {
        private readonly IUnitOfWork _unitOfWork;
        public ProductsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]AddProductRequest request)
        {
            var response = await _unitOfWork.Product.AddAsync(request);
            if(response.Errors != null)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromODataUri] string key, [FromBody] UpdateProductRequest request)
        {
            await _unitOfWork.Product.UpdateAsync(key, request);
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromODataUri] string key)
        {
            await _unitOfWork.Product.RemoveAsync(key);
            return Ok();
        }
    }
}
