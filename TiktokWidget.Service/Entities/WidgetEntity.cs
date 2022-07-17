﻿using System;
using System.Collections.Generic;
using TiktokWidget.Common.Enums;
using TiktokWidget.Service.Entities.ValueObjects;

namespace TiktokWidget.Service.Entities
{
    public class WidgetEntity : BaseEntity<string>
    {
        public string WidgetTitle { get; set; }
        public SourceTypeEnum SourceType { get; set; }
        public string ValueSource { get; set; }
        public virtual SettingValueObject Setting { get; set; }
        public virtual HeaderValueObject Header { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime ModifyDate { get; set; }
        public DateTime TimeUpdateVideo { get; set; }
        public int ShopId { get; set; }
        public List<ProductEntity> Products { get; set; }
        public ShopEntity Shops { get; set; }
    }
}
