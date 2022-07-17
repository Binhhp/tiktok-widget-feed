
using System.ComponentModel.DataAnnotations;

namespace TiktokWidget.Service.Entities
{
    public class ProductEntity : BaseEntity<string>
    {
        [StringLength(500)]
        public string Title { get; set; }
        [StringLength(500)]
        public string Handle { get; set; }
        public int ShopId { get; set; }
        public string Variants { get; set; }
        public string Prices { get; set; }
        public string VariantSku { get; set; }
        public string VariantName { get; set; }
        public string Image { get; set; }
        public virtual WidgetEntity Widget { get; set; }
        public virtual ShopEntity Shops { get; set; }
    }
}
