using System;
using System.Collections.Generic;
using TiktokWidget.Common.Enums;
using TiktokWidget.Service.Entities.ValueObjects;

namespace TiktokWidget.Service.Entities
{
    public class TikTokWidgetEntity : BaseEntity<string>
    {
        public string WidgetTitle { get; set; }
        public SourceTypeEnum SourceType { get; set; }
        public string ValueSource { get; set; }
        public IEnumerable<string> DisableShowItems { get; set; }
        public IEnumerable<string> ItemSorts { get; set; }
        public virtual TikTokOptions Setting { get; set; }
        public virtual HeaderOptions Header { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime ModifyDate { get; set; }
        public DateTime TimeUpdateVideo { get; set; }
        public int ShopId { get; set; }
        public List<ProductEntity> Products { get; set; }
        public ShopEntity Shops { get; set; }
    }
}
