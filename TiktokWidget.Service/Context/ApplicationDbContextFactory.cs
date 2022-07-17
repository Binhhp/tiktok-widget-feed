using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace TiktokWidget.Service.Context
{
    public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<TiktokWidgetDbContext>
    {
        public TiktokWidgetDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<TiktokWidgetDbContext>();
            optionsBuilder.UseSqlServer("Server=14.225.5.25;Database=ShopifyTiktok;User Id=dev;Password=orichi123!@#;Trusted_Connection=False;MultipleActiveResultSets=true;TrustServerCertificate=True;");
            return new TiktokWidgetDbContext(optionsBuilder.Options);
        }
    }
}
