using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace TiktokWidget.Service.Entities.ValueObjects
{
    public class HeaderValueObject
    {
        public bool Enable { get; set; }
        [MaxLength(155)]
        public string Title { get; set; }
        [MaxLength(255)]
        public string Caption { get; set; }
        public virtual WidgetEntity Widget { get; set; }
    }
}
