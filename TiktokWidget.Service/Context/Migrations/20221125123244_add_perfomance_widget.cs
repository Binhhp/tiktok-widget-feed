using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TiktokWidget.Service.Context.Migrations
{
    public partial class add_perfomance_widget : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "InstagramWidgetId",
                table: "Product",
                type: "nvarchar(100)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Banner",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Banner", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Course",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<bool>(type: "bit", nullable: false),
                    Ordering = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Course", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ImpressionWidget",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Time = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Impression = table.Column<long>(type: "bigint", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    WidgetId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ShopId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImpressionWidget", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "InstagramWidget",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    WidgetTitle = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    SourceType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ValueSource = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Setting_LayoutType = table.Column<int>(type: "int", nullable: true),
                    Setting_LabelReadMore = table.Column<string>(type: "nvarchar(155)", maxLength: 155, nullable: true),
                    Setting_LabelLoadMore = table.Column<string>(type: "nvarchar(155)", maxLength: 155, nullable: true),
                    Setting_ShowNetworkIcon = table.Column<bool>(type: "bit", nullable: true),
                    Setting_LoadMoreBackGround = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Setting_ItemBackGround = table.Column<string>(type: "nvarchar(18)", maxLength: 18, nullable: true),
                    Setting_ItemColor = table.Column<string>(type: "nvarchar(18)", maxLength: 18, nullable: true),
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
                    table.PrimaryKey("PK_InstagramWidget", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InstagramWidget_Shop_ShopId",
                        column: x => x.ShopId,
                        principalTable: "Shop",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PostClickWidget",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Time = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Click = table.Column<int>(type: "int", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    WidgetId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ShopId = table.Column<int>(type: "int", nullable: false),
                    PostInfo_Id = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PostInfo_Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PostInfo_Image = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostClickWidget", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Product_InstagramWidgetId",
                table: "Product",
                column: "InstagramWidgetId");

            migrationBuilder.CreateIndex(
                name: "IX_InstagramWidget_ShopId",
                table: "InstagramWidget",
                column: "ShopId");

            migrationBuilder.CreateIndex(
                name: "IX_InstagramWidget_WidgetTitle",
                table: "InstagramWidget",
                column: "WidgetTitle");

            migrationBuilder.AddForeignKey(
                name: "FK_Product_InstagramWidget_InstagramWidgetId",
                table: "Product",
                column: "InstagramWidgetId",
                principalTable: "InstagramWidget",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Product_InstagramWidget_InstagramWidgetId",
                table: "Product");

            migrationBuilder.DropTable(
                name: "Banner");

            migrationBuilder.DropTable(
                name: "Course");

            migrationBuilder.DropTable(
                name: "ImpressionWidget");

            migrationBuilder.DropTable(
                name: "InstagramWidget");

            migrationBuilder.DropTable(
                name: "PostClickWidget");

            migrationBuilder.DropIndex(
                name: "IX_Product_InstagramWidgetId",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "InstagramWidgetId",
                table: "Product");
        }
    }
}
