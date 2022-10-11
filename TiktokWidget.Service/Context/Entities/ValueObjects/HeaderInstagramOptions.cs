﻿using System.ComponentModel.DataAnnotations;
using TiktokWidget.Service.Context.Entities;

namespace TiktokWidget.Service.Entities.ValueObjects
{
    public class HeaderInstagramOptions
    {
        public bool Enable { get; set; }
        [MaxLength(155)]
        public string Title { get; set; }
        public virtual InstagramWidgetEntity Widget { get; set; }
    }
}
