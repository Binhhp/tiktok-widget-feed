﻿
using System.ComponentModel.DataAnnotations;

namespace TiktokWidget.Service.Entities
{
    public class ProductEntity : BaseEntity<string>
    {
        [Key]
        public int ShopId { get; set; }
        public string ProductId { get; set; }

        [StringLength(500)]
        public string Title { get; set; }
        [StringLength(500)]
        public string Handle { get; set; }
        public string Variants { get; set; }
        public string Prices { get; set; }
        public string VariantSku { get; set; }
        public string VariantName { get; set; }
        public string Image { get; set; }
        public virtual TikTokWidgetEntity Widget { get; set; }
        public virtual InstagramWidgetEntity InstagramWidget { get; set; }
        public virtual ShopEntity Shops { get; set; }
    }
}
