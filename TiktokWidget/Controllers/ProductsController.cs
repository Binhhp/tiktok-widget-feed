using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TiktokWidget.Service.Dtos.Requests.TikTokWidgets;
using TiktokWidget.Service.Interfaces;

namespace TiktokWidget.Controllers
{
    public class ProductsController : ODataController
    {
        private readonly IProductService _productService;
        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]AddProductRequest request)
        {
            var response = await _productService.AddAsync(request);
            if(response.Errors != null)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromODataUri] string key, [FromBody] UpdateProductRequest request)
        {
            await _productService.UpdateAsync(key, request);
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromODataUri] string key)
        {
            await _productService.RemoveAsync(key);
            return Ok();
        }
    }
}
