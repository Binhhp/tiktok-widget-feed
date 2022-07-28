using ShopifySharp;
using System.Collections.Generic;
using TiktokWidget.Service.Entities;

namespace TiktokWidget.ODataEntities.Models
{
    public class ShopOdataEntity : ShopEntity
    {
        public IEnumerable<Theme> Themes { get; set; }
    }
}
