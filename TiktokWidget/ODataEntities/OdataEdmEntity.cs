using Microsoft.AspNet.OData.Builder;
using Microsoft.OData.Edm;
using System.Collections.Generic;
using TiktokWidget.ODataEntities.Models;
using TiktokWidget.Service.Entities;
using TiktokWidget.Service.Models;
using TiktokWidget.Service.ViewModels;

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

        private static List<string> InstagramVideoActions = new List<string>
        {
            "SetClicks"
        };

        private static List<string> TikTokVideoActions = new List<string>
        {
            "SetClicks"
        };

        private static List<string> ShopEntityActions = new List<string>
        {
            "UpdateShopConfiguration",
            "RegisterTikTokWidget",
            "RegisterInstagramWidget",
            "AddJob",
            "GetWidgetCounts",
            "GetInstagramWidgetCounts",
            "GetThemes",
            "Analytics",
            "Feedback"
        };
        private static void BuildEdmModelShare()
        {
            _builder.EntitySet<ShopWidgetsOdataEntity>("ShopWidgets");
            _builder.EntitySet<TikTokWidgetEntity>("TikTokWidgets");
            _builder.EntitySet<InstagramWidgetEntity>("InstagramWidgets");
            _builder.EntitySet<ShopOdataEntity>("Shops").EntityType.HasKey(x => new { x.Domain });
            _builder.EntitySet<ShopEntity>("ShopEntity").EntityType.HasKey(x => new { x.Domain });
            _builder.EntitySet<ProductEntity>("Products");
            _builder.EntitySet<ShopConfigurationEntity>("ShopConfiguration");
            _builder.EntitySet<PerformancesEntity>("Traffic");
            _builder.EntitySet<ShopDescriptorEntity>("ShopDescriptor");
            _builder.EntitySet<CoursesEntity>("Courses");
            _builder.EntitySet<BannerEnitty>("Banner");
            _builder.EntitySet<PostViewModel>("Posts");
            BuildEdmModel<TikTokWidgetEntity>(TikTokWidgetActions);
            BuildEdmModel<InstagramWidgetEntity>(InstagramWidgetActions);

            //Videos
            _builder.EntitySet<VideoTikTokModel>("TikTokVideos");
            _builder.EntitySet<InstagramViewModel>("InstagramVideos");
            BuildEdmModel<InstagramViewModel>(InstagramVideoActions);
            BuildEdmModel<VideoTikTokModel>(TikTokVideoActions);

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
