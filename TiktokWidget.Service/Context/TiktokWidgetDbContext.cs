using Microsoft.EntityFrameworkCore;
using TiktokWidget.Common.Enums;
using TiktokWidget.Service.Configuarations;
using TiktokWidget.Service.Entities;

namespace TiktokWidget.Service.Context
{
    public class TiktokWidgetDbContext : DbContext
    {
        public TiktokWidgetDbContext(DbContextOptions<TiktokWidgetDbContext> options) : base(options)
        {
        }
        public DbSet<WidgetEntity> Widgets { get; set; }
        public DbSet<JobEntity> Job { get; set; }
        public DbSet<ShopEntity> Shop { get; set; }
        public DbSet<ShopConfigurationEntity> ShopConfiguration { get; set; }
        public DbSet<ProductEntity> Product { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new WidgetConfiguaration());
            var widget = modelBuilder.Entity<WidgetEntity>().ToTable("Widget");
            widget.OwnsOne(x => x.Setting);
            widget.OwnsOne(x => x.Header);

            modelBuilder.Entity<WidgetEntity>().Property(g => g.SourceType).HasMaxLength(50);
            modelBuilder.Entity<WidgetEntity>().Property(g => g.SourceType)
                .HasConversion(
                v => v == SourceTypeEnum.HashTag ? "hashtag" : "username",
                v => v == "hashtag" ? SourceTypeEnum.HashTag : SourceTypeEnum.UserName);

            modelBuilder.Entity<JobEntity>().ToTable("Job");
            modelBuilder.Entity<JobEntity>().Property(g => g.Type).HasMaxLength(50);
            modelBuilder.Entity<JobEntity>().Property(g => g.Type)
                .HasConversion(
                v => v == SourceTypeEnum.HashTag ? "hashtag" : v == SourceTypeEnum.Product ? "product" : "username",
                v => v == "hashtag" ? SourceTypeEnum.HashTag : v == "product" ? SourceTypeEnum.Product : SourceTypeEnum.UserName);
            modelBuilder.Entity<ProductEntity>().ToTable("Product");
            modelBuilder.Entity<ShopEntity>().HasKey(x => x.ID);
            modelBuilder.Entity<ShopEntity>().Property(x => x.ID).ValueGeneratedOnAdd(); 
            modelBuilder.Entity<ShopEntity>().HasMany(c => c.Widgets).WithOne(e => e.Shops).HasForeignKey(x => x.ShopId);
            modelBuilder.Entity<ShopEntity>().HasMany(c => c.Products).WithOne(e => e.Shops).HasForeignKey(x => x.ShopId);
            modelBuilder.Entity<WidgetEntity>().HasMany(c => c.Products).WithOne(e => e.Widget);
            modelBuilder.Entity<ShopConfigurationEntity>().ToTable("ShopConfiguration");
            modelBuilder.Entity<ShopEntity>().HasOne(x => x.ShopConfiguration).WithOne(x => x.Shops).HasForeignKey<ShopConfigurationEntity>(x => x.ShopId);
        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }
}
