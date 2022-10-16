using Microsoft.AspNet.OData.Builder;
using Microsoft.OData.Edm;
using ShopifySharp;
using System.Collections.Generic;
using TiktokWidget.ODataEntities.Models;
using TiktokWidget.Service.Entities;
using TiktokWidget.Service.Models;

namespace TiktokWidget.ODataEntities
{
    public class OdataEdmEntity
    {
        private static ODataConventionModelBuilder _builder = new ODataConventionModelBuilder();
        public static IEdmModel GetEdmModel()
        {
            _builder.EnableLowerCamelCase();
            // Register Entity Odata
            BuildEdmModelShare();

            return _builder.GetEdmModel();
        }
        private static List<string> TikTokWidgetActions = new List<string>
        {
            "UpdateProduct"
        };

        private static List<string> InstagramWidgetActions = new List<string>
        {
            "UpdateProduct"
        };

        private static List<string> ShopEntityActions = new List<string>
        {
            "UpdateShopConfiguration",
            "RegisterWidget",
            "RegisterInstagramWidgets",
            "AddJob",
            "GetWidgetCounts",
            "GetInstagramWidgetCounts",
            "GetThemes"
        };
        private static void BuildEdmModelShare()
        {
            _builder.EntitySet<ShopWidgetsOdataEntity>("ShopWidgets");
            _builder.EntitySet<TikTokWidgetEntity>("Widgets");
            _builder.EntitySet<InstagramWidgetEntity>("InstagramWidgets");
            _builder.EntitySet<ShopOdataEntity>("Shops").EntityType.HasKey(x => new { x.Domain });
            _builder.EntitySet<ShopEntity>("ShopEntity").EntityType.HasKey(x => new { x.Domain });
            _builder.EntitySet<ProductEntity>("Products");
            _builder.EntitySet<ShopConfigurationEntity>("ShopConfiguration");
            _builder.EntitySet<VideoTikTokModel>("WidgetVideos");
            BuildEdmModel<TikTokWidgetEntity>(TikTokWidgetActions);
            BuildEdmModel<InstagramWidgetEntity>(InstagramWidgetActions);
            BuildEdmModel<ShopEntity>(ShopEntityActions);
        }
        private static void BuildEdmModel<T>(List<string> actions) where T : class
        {
            var entityType = _builder.EntityType<T>();

            foreach (var action in actions)
            {
                entityType.Action(action);
            }
        }
    }
}
