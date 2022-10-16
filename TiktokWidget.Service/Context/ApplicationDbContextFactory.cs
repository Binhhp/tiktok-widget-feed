using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace TiktokWidget.Service.Context
{
    public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<WidgetFeedDbContext>
    {
        private string Server = "Server=14.225.5.62;Database=ShopifyTiktok2022;User Id=tiktok;Password=orichi247!@#;Encrypt=False;MultipleActiveResultSets=True;TrustServerCertificate=True;";
        private string ServerTest = "Server=14.225.5.25;Database=ShopifyTiktok;User Id=dev;Password=orichi123!@#;Encrypt=False;MultipleActiveResultSets=True;TrustServerCertificate=True;";
        private string Localhost = "Server=.;Database=ShopifyTiktok2022;User Id=sa;Password=binhhp20;Encrypt=False;MultipleActiveResultSets=True;TrustServerCertificate=True;";
        public WidgetFeedDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<WidgetFeedDbContext>();
            optionsBuilder.UseSqlServer(ServerTest);
            return new WidgetFeedDbContext(optionsBuilder.Options);
        }
    }
}
