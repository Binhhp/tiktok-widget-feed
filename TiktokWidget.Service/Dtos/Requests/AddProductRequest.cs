using System;
using System.Collections.Generic;
using System.Text;

namespace TiktokWidget.Service.Dtos.Requests
{
    public class AddProductRequest
    {
        public IEnumerable<ProductDto> Products { get; set; }
    }

    public class UpdateProductRequest : ProductDto
    {
    }
    public class ProductDto
    {
        public string Title { get; set; }
        public string Handle { get; set; }
        public string Variants { get; set; }
        public string Prices { get; set; }
        public string VariantSku { get; set; }
        public string VariantName { get; set; }
        public string Image { get; set; }
    }
}
