using Microsoft.Extensions.DependencyInjection;
using TiktokWidget.Service.Implements;
using TiktokWidget.Service.Interfaces;

namespace TiktokWidget.Features
{
    public static class ServiceModules
    {
        public static void AddServicesModules(this IServiceCollection services)
        {
            services.AddScoped<IInstagramWidgetService, InstagramWidgetService>();
            services.AddScoped<IWidgetService, WidgetService>();
            services.AddScoped<IShopService, ShopService>();
            services.AddScoped<IProductService, ProductService>();
        }
    }
}
