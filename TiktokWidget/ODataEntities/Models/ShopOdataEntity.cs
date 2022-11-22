using ShopifySharp;
using System.Collections.Generic;
using TiktokWidget.Service.Entities;
using TiktokWidget.Service.ViewModels;

namespace TiktokWidget.ODataEntities.Models
{
    public class ShopOdataEntity : ShopEntity
    {
        public IEnumerable<Theme> Themes { get; set; }

        public IEnumerable<TikTokWidgetEntity> TikTokWidgets { get; set; }

        public IEnumerable<PerformancesEntity> Traffic { get; set; }

        public IEnumerable<PostViewModel> Posts { get; set; } 
    }
}
