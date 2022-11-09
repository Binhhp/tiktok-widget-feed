using TiktokWidget.Service.Interfaces;

namespace TiktokWidget.Service.Implements
{
    public class UnitOfWork : IUnitOfWork
    {
        public ITikTokWidgetService TikTok { get; private set; }

        public IInstagramWidgetService Instagram { get; private set; }

        public IShopService Shop { get; private set; }

        public IPerformancesService Performance { get; private set; }

        public IProductService Product { get; private set; }

        public UnitOfWork(ITikTokWidgetService tiktok, IInstagramWidgetService instagram, IShopService shop, IPerformancesService performances, IProductService product)
        {
            TikTok = tiktok;
            Instagram = instagram;
            Shop = shop;
            Performance = performances;
            Product = product;
        }
    }
}
