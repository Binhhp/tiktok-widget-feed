using Microsoft.Extensions.DependencyInjection;
using TiktokWidget.Common.HttpLogging;

namespace TiktokWidget.Features
{
    public static class DefaultModules
    {
        public static void AddDefaultModules(this IServiceCollection services)
        {
            services.AddSingleton<IHttpLogProvider, HttpLogProvider>();
        }
    }
}
