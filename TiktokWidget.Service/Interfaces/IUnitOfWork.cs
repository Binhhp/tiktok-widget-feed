using Orichi.IoC.Containers.LifeScoped;

namespace TiktokWidget.Service.Interfaces
{
    public interface IUnitOfWork : IScopedDependency
    {
        ITikTokWidgetService TikTok { get; }
        IInstagramWidgetService Instagram { get; }
        IShopService Shop { get; }
        IPerformancesService Performance { get; }  
        IProductService Product { get; }
    }
}
