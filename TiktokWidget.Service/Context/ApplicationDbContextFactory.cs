using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace TiktokWidget.Service.Context
{
    public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<TiktokWidgetDbContext>
    {
        public TiktokWidgetDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<TiktokWidgetDbContext>();
            optionsBuilder.UseSqlServer("Server=14.225.5.62;Database=ShopifyTiktok2022;User Id=tiktok;Password=orichi247!@#;Encrypt=False;MultipleActiveResultSets=True;TrustServerCertificate=True;");
            return new TiktokWidgetDbContext(optionsBuilder.Options);
        }
    }
}
