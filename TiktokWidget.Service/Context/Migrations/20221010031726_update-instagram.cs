using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TiktokWidget.Service.Context.Migrations
{
    public partial class updateinstagram : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Product_Widget_WidgetId",
                table: "Product");

            migrationBuilder.DropTable(
                name: "Widget");

            migrationBuilder.AddColumn<string>(
                name: "InstagramWidgetId",
                table: "Product",
                type: "nvarchar(100)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "InstagramWidgets",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    WidgetTitle = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    SourceType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ValueSource = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Setting_LayoutType = table.Column<int>(type: "int", nullable: true),
                    Setting_LabelReadMore = table.Column<string>(type: "nvarchar(155)", maxLength: 155, nullable: true),
                    Setting_ShowNetworkIcon = table.Column<bool>(type: "bit", nullable: true),
                    Setting_BackGround = table.Column<string>(type: "nvarchar(18)", maxLength: 18, nullable: true),
                    Setting_Color = table.Column<string>(type: "nvarchar(18)", maxLength: 18, nullable: true),
                    Setting_NumberPerRow = table.Column<int>(type: "int", nullable: true),
                    Setting_LimitItems = table.Column<int>(type: "int", nullable: true),
                    Header_Enable = table.Column<bool>(type: "bit", nullable: true),
                    Header_Title = table.Column<string>(type: "nvarchar(155)", maxLength: 155, nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifyDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ShopId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InstagramWidgets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InstagramWidgets_Shop_ShopId",
                        column: x => x.ShopId,
                        principalTable: "Shop",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Widgets",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    WidgetTitle = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    SourceType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ValueSource = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Setting_LayoutType = table.Column<int>(type: "int", nullable: true),
                    Setting_LabelReadMore = table.Column<string>(type: "nvarchar(155)", maxLength: 155, nullable: true),
                    Setting_LabelViewMore = table.Column<string>(type: "nvarchar(155)", maxLength: 155, nullable: true),
                    Setting_ShowProfile = table.Column<bool>(type: "bit", nullable: true),
                    Setting_ShowNetworkIcon = table.Column<bool>(type: "bit", nullable: true),
                    Setting_AccentColor = table.Column<string>(type: "nvarchar(18)", maxLength: 18, nullable: true),
                    Setting_BackGround = table.Column<string>(type: "nvarchar(18)", maxLength: 18, nullable: true),
                    Setting_Color = table.Column<string>(type: "nvarchar(18)", maxLength: 18, nullable: true),
                    Setting_NumberPerRow = table.Column<int>(type: "int", nullable: true),
                    Header_Enable = table.Column<bool>(type: "bit", nullable: true),
                    Header_Title = table.Column<string>(type: "nvarchar(155)", maxLength: 155, nullable: true),
                    Header_Caption = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifyDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TimeUpdateVideo = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ShopId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Widgets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Widgets_Shop_ShopId",
                        column: x => x.ShopId,
                        principalTable: "Shop",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Product_InstagramWidgetId",
                table: "Product",
                column: "InstagramWidgetId");

            migrationBuilder.CreateIndex(
                name: "IX_InstagramWidgets_ShopId",
                table: "InstagramWidgets",
                column: "ShopId");

            migrationBuilder.CreateIndex(
                name: "IX_InstagramWidgets_WidgetTitle",
                table: "InstagramWidgets",
                column: "WidgetTitle");

            migrationBuilder.CreateIndex(
                name: "IX_Widgets_ShopId",
                table: "Widgets",
                column: "ShopId");

            migrationBuilder.CreateIndex(
                name: "IX_Widgets_WidgetTitle",
                table: "Widgets",
                column: "WidgetTitle");

            migrationBuilder.AddForeignKey(
                name: "FK_Product_InstagramWidgets_InstagramWidgetId",
                table: "Product",
                column: "InstagramWidgetId",
                principalTable: "InstagramWidgets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Product_Widgets_WidgetId",
                table: "Product",
                column: "WidgetId",
                principalTable: "Widgets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Product_InstagramWidgets_InstagramWidgetId",
                table: "Product");

            migrationBuilder.DropForeignKey(
                name: "FK_Product_Widgets_WidgetId",
                table: "Product");

            migrationBuilder.DropTable(
                name: "InstagramWidgets");

            migrationBuilder.DropTable(
                name: "Widgets");

            migrationBuilder.DropIndex(
                name: "IX_Product_InstagramWidgetId",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "InstagramWidgetId",
                table: "Product");

            migrationBuilder.CreateTable(
                name: "Widget",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifyDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ShopId = table.Column<int>(type: "int", nullable: false),
                    SourceType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    TimeUpdateVideo = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ValueSource = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    WidgetTitle = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Header_Caption = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Header_Enable = table.Column<bool>(type: "bit", nullable: true),
                    Header_Title = table.Column<string>(type: "nvarchar(155)", maxLength: 155, nullable: true),
                    Setting_AccentColor = table.Column<string>(type: "nvarchar(18)", maxLength: 18, nullable: true),
                    Setting_BackGround = table.Column<string>(type: "nvarchar(18)", maxLength: 18, nullable: true),
                    Setting_Color = table.Column<string>(type: "nvarchar(18)", maxLength: 18, nullable: true),
                    Setting_LabelReadMore = table.Column<string>(type: "nvarchar(155)", maxLength: 155, nullable: true),
                    Setting_LabelViewMore = table.Column<string>(type: "nvarchar(155)", maxLength: 155, nullable: true),
                    Setting_LayoutType = table.Column<int>(type: "int", nullable: true),
                    Setting_NumberPerRow = table.Column<int>(type: "int", nullable: true),
                    Setting_ShowNetworkIcon = table.Column<bool>(type: "bit", nullable: true),
                    Setting_ShowProfile = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Widget", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Widget_Shop_ShopId",
                        column: x => x.ShopId,
                        principalTable: "Shop",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Widget_ShopId",
                table: "Widget",
                column: "ShopId");

            migrationBuilder.CreateIndex(
                name: "IX_Widget_WidgetTitle",
                table: "Widget",
                column: "WidgetTitle");

            migrationBuilder.AddForeignKey(
                name: "FK_Product_Widget_WidgetId",
                table: "Product",
                column: "WidgetId",
                principalTable: "Widget",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
