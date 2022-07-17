using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TiktokWidget.Service.Entities;

namespace TiktokWidget.Service.Configuarations
{
    public class WidgetConfiguaration : IEntityTypeConfiguration<WidgetEntity>
    {
        public void Configure(EntityTypeBuilder<WidgetEntity> builder)
        {
            builder.ToTable("Widgets");

            builder.HasIndex(p => p.WidgetTitle);

            builder.HasKey(p => p.Id);

            builder.Property(x => x.Id).HasMaxLength(100);

            builder.Property(p => p.WidgetTitle).IsRequired().IsUnicode(true).HasMaxLength(150);

            builder.Property(p => p.ValueSource).IsRequired().IsUnicode(true).HasMaxLength(255);
        }
    }
}
