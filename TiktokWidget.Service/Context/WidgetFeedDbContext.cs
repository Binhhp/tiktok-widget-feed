using Microsoft.EntityFrameworkCore;
using TiktokWidget.Common.Enums;
using TiktokWidget.Service.Entities;

namespace TiktokWidget.Service.Context
{
    public class WidgetFeedDbContext : DbContext
    {
        public WidgetFeedDbContext(DbContextOptions<WidgetFeedDbContext> options) : base(options)
        {
        }
        public DbSet<InstagramWidgetEntity> InstagramWidgets { get; set; }
        public DbSet<TikTokWidgetEntity> Widgets { get; set; }
        public DbSet<JobEntity> Job { get; set; }
        public DbSet<ShopEntity> Shop { get; set; }
        public DbSet<ShopConfigurationEntity> ShopConfiguration { get; set; }
        public DbSet<ProductEntity> Product { get; set; }
        public DbSet<PerformancesEntity> Performances { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Config tiktok widget entity
            var tiktokWidget = modelBuilder.Entity<TikTokWidgetEntity>().ToTable("Widget");
            tiktokWidget.OwnsOne(x => x.Setting);
            tiktokWidget.OwnsOne(x => x.Header);
            tiktokWidget.HasIndex(p => p.WidgetTitle);
            tiktokWidget.HasKey(p => p.Id);
            tiktokWidget.Property(x => x.Id).HasMaxLength(100);
            tiktokWidget.Property(p => p.WidgetTitle).IsRequired().IsUnicode(true).HasMaxLength(150);
            tiktokWidget.Property(p => p.ValueSource).IsRequired().IsUnicode(true).HasMaxLength(255);
            tiktokWidget.Property(g => g.SourceType).HasMaxLength(50);
            tiktokWidget.Property(g => g.SourceType)
                .HasConversion(
                v => v == SourceTypeEnum.HashTag ? "hashtag" : "username",
                v => v == "hashtag" ? SourceTypeEnum.HashTag : SourceTypeEnum.UserName);
            tiktokWidget.HasMany(c => c.Products).WithOne(e => e.Widget);

            //Config job entity
            var job = modelBuilder.Entity<JobEntity>().ToTable("Job");
            job.Property(g => g.Type).HasMaxLength(50);
            job.Property(g => g.Type)
                .HasConversion(
                v => v == SourceTypeEnum.HashTag ? "hashtag" : v == SourceTypeEnum.Product ? "product" : "username",
                v => v == "hashtag" ? SourceTypeEnum.HashTag : v == "product" ? SourceTypeEnum.Product : SourceTypeEnum.UserName);

            //Config Product
            modelBuilder.Entity<ProductEntity>().ToTable("Product").HasKey(x => new { x.Id, x.ShopId });
            
            //Config Shop Configuration 
            modelBuilder.Entity<ShopConfigurationEntity>().ToTable("ShopConfiguration");
            
            //Config Shop
            modelBuilder.Entity<ShopEntity>().HasKey(x => x.ID);
            modelBuilder.Entity<ShopEntity>().Property(x => x.ID).ValueGeneratedOnAdd(); 
            modelBuilder.Entity<ShopEntity>().HasMany(c => c.Widgets).WithOne(e => e.Shops).HasForeignKey(x => x.ShopId);
            modelBuilder.Entity<ShopEntity>().HasMany(c => c.Products).WithOne(e => e.Shops).HasForeignKey(x => x.ShopId);
            modelBuilder.Entity<ShopEntity>().HasOne(x => x.ShopConfiguration).WithOne(x => x.Shops).HasForeignKey<ShopConfigurationEntity>(x => x.ShopId);

            //Config instagram widget entity
            var instagramWidget = modelBuilder.Entity<InstagramWidgetEntity>().ToTable("InstagramWidget");
            instagramWidget.OwnsOne(x => x.Setting);
            instagramWidget.OwnsOne(x => x.Header);
            instagramWidget.HasIndex(p => p.WidgetTitle);
            instagramWidget.HasKey(p => p.Id);
            instagramWidget.Property(x => x.Id).HasMaxLength(100);
            instagramWidget.Property(p => p.WidgetTitle).IsRequired().HasMaxLength(150);
            instagramWidget.Property(p => p.ValueSource).IsRequired().HasMaxLength(255);
            instagramWidget.Property(g => g.SourceType).HasMaxLength(50);
            instagramWidget.Property(g => g.SourceType)
                .HasConversion(
                v => v == SourceTypeEnum.HashTag ? "hashtag" : "username",
                v => v == "hashtag" ? SourceTypeEnum.HashTag : SourceTypeEnum.UserName);
            instagramWidget.HasMany(c => c.Products).WithOne(e => e.InstagramWidget);
            modelBuilder.Entity<ShopEntity>().HasMany(c => c.InstagramWidgets).WithOne(e => e.Shops).HasForeignKey(x => x.ShopId);

            //Config performances of shop
            var performances = modelBuilder.Entity<PerformancesEntity>().ToTable("Performances");
            performances.HasOne(c => c.Shops).WithMany(e => e.Performances).HasForeignKey(x => x.ShopId);
        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }
}
