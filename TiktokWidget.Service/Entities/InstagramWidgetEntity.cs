using System;
using System.Collections.Generic;
using TiktokWidget.Common.Enums;
using TiktokWidget.Service.Entities.ValueObjects;

namespace TiktokWidget.Service.Entities
{
    public class InstagramWidgetEntity : BaseEntity<string>
    {
        public string WidgetTitle { get; set; }
        public SourceTypeEnum SourceType { get; set; }
        public string ValueSource { get; set; }
        public IEnumerable<string> DisableShowItems { get; set; }
        public IEnumerable<string> ItemSorts { get; set; }
        public virtual InstagramOptions Setting { get; set; }
        public virtual HeaderInstagramOptions Header { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime ModifyDate { get; set; }
        public int ShopId { get; set; }
        public List<ProductEntity> Products { get; set; }
        public ShopEntity Shops { get; set; }
    }
}
