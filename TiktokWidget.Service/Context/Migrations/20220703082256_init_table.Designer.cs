﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TiktokWidget.Service.Context;

namespace TiktokWidget.Service.Context.Migrations
{
    [DbContext(typeof(TiktokWidgetDbContext))]
    [Migration("20220703082256_init_table")]
    partial class init_table
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.17")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("TiktokWidget.Service.Entities.JobEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Data")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Job");
                });

            modelBuilder.Entity("TiktokWidget.Service.Entities.ProductEntity", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Handle")
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("Image")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Prices")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ShopId")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("VariantName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("VariantSku")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Variants")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("WidgetId")
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id");

                    b.HasIndex("ShopId");

                    b.HasIndex("WidgetId");

                    b.ToTable("Product");
                });

            modelBuilder.Entity("TiktokWidget.Service.Entities.ShopConfigurationEntity", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("ButtonPosition")
                        .HasColumnType("int");

                    b.Property<string>("Image")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsEnabled")
                        .HasColumnType("bit");

                    b.Property<int>("ShopId")
                        .HasColumnType("int");

                    b.Property<string>("Theme")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TikTokUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Timezone")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ShopId")
                        .IsUnique();

                    b.ToTable("ShopConfiguration");
                });

            modelBuilder.Entity("TiktokWidget.Service.Entities.ShopEntity", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long>("ChargeId")
                        .HasColumnType("bigint");

                    b.Property<string>("ConfirmUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Country")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Currency")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Domain")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email2")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("GetData")
                        .HasColumnType("bit");

                    b.Property<long>("InstalledDate")
                        .HasColumnType("bigint");

                    b.Property<string>("Phone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PlanName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("ShopID")
                        .HasColumnType("bigint");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<int>("StepSetup")
                        .HasColumnType("int");

                    b.Property<string>("Token")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("TrialDay")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.ToTable("Shop");
                });

            modelBuilder.Entity("TiktokWidget.Service.Entities.WidgetEntity", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<DateTime>("CreateDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("ModifyDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ShopID")
                        .HasColumnType("int");

                    b.Property<string>("SourceType")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<DateTime>("TimeUpdateVideo")
                        .HasColumnType("datetime2");

                    b.Property<string>("ValueSource")
                        .IsRequired()
                        .HasMaxLength(255)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("WidgetTitle")
                        .IsRequired()
                        .HasMaxLength(150)
                        .IsUnicode(true)
                        .HasColumnType("nvarchar(150)");

                    b.HasKey("Id");

                    b.HasIndex("ShopID");

                    b.HasIndex("WidgetTitle")
                        .IsUnique();

                    b.ToTable("Widget");
                });

            modelBuilder.Entity("TiktokWidget.Service.Entities.ProductEntity", b =>
                {
                    b.HasOne("TiktokWidget.Service.Entities.ShopEntity", "Shops")
                        .WithMany("Products")
                        .HasForeignKey("ShopId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("TiktokWidget.Service.Entities.WidgetEntity", "Widget")
                        .WithMany("Products")
                        .HasForeignKey("WidgetId");

                    b.Navigation("Shops");

                    b.Navigation("Widget");
                });

            modelBuilder.Entity("TiktokWidget.Service.Entities.ShopConfigurationEntity", b =>
                {
                    b.HasOne("TiktokWidget.Service.Entities.ShopEntity", "Shops")
                        .WithOne("ShopConfiguration")
                        .HasForeignKey("TiktokWidget.Service.Entities.ShopConfigurationEntity", "ShopId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Shops");
                });

            modelBuilder.Entity("TiktokWidget.Service.Entities.WidgetEntity", b =>
                {
                    b.HasOne("TiktokWidget.Service.Entities.ShopEntity", "Shop")
                        .WithMany("Widget")
                        .HasForeignKey("ShopID");

                    b.OwnsOne("TiktokWidget.Service.Entities.ValueObjects.HeaderValueObject", "Header", b1 =>
                        {
                            b1.Property<string>("WidgetId")
                                .HasColumnType("nvarchar(100)");

                            b1.Property<string>("Caption")
                                .HasMaxLength(255)
                                .HasColumnType("nvarchar(255)");

                            b1.Property<bool>("Enable")
                                .HasColumnType("bit");

                            b1.Property<string>("Title")
                                .HasMaxLength(155)
                                .HasColumnType("nvarchar(155)");

                            b1.HasKey("WidgetId");

                            b1.ToTable("Widget");

                            b1.WithOwner("Widget")
                                .HasForeignKey("WidgetId");

                            b1.Navigation("Widget");
                        });

                    b.OwnsOne("TiktokWidget.Service.Entities.ValueObjects.SettingValueObject", "Setting", b1 =>
                        {
                            b1.Property<string>("WidgetId")
                                .HasColumnType("nvarchar(100)");

                            b1.Property<string>("AccentColor")
                                .HasMaxLength(18)
                                .HasColumnType("nvarchar(18)");

                            b1.Property<string>("BackGround")
                                .HasMaxLength(18)
                                .HasColumnType("nvarchar(18)");

                            b1.Property<string>("Color")
                                .HasMaxLength(18)
                                .HasColumnType("nvarchar(18)");

                            b1.Property<string>("LabelReadMore")
                                .HasMaxLength(155)
                                .HasColumnType("nvarchar(155)");

                            b1.Property<string>("LabelViewMore")
                                .HasMaxLength(155)
                                .HasColumnType("nvarchar(155)");

                            b1.Property<int>("LayoutType")
                                .HasColumnType("int");

                            b1.Property<int>("NumberPerRow")
                                .HasColumnType("int");

                            b1.Property<bool>("ShowNetworkIcon")
                                .HasColumnType("bit");

                            b1.Property<bool>("ShowProfile")
                                .HasColumnType("bit");

                            b1.HasKey("WidgetId");

                            b1.ToTable("Widget");

                            b1.WithOwner("Widget")
                                .HasForeignKey("WidgetId");

                            b1.Navigation("Widget");
                        });

                    b.Navigation("Header");

                    b.Navigation("Setting");

                    b.Navigation("Shop");
                });

            modelBuilder.Entity("TiktokWidget.Service.Entities.ShopEntity", b =>
                {
                    b.Navigation("Products");

                    b.Navigation("ShopConfiguration");

                    b.Navigation("Widget");
                });

            modelBuilder.Entity("TiktokWidget.Service.Entities.WidgetEntity", b =>
                {
                    b.Navigation("Products");
                });
#pragma warning restore 612, 618
        }
    }
}
