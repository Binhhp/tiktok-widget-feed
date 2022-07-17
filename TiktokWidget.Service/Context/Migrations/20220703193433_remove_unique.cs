using Microsoft.EntityFrameworkCore.Migrations;

namespace TiktokWidget.Service.Context.Migrations
{
    public partial class remove_unique : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Widget_Shop_ShopID",
                table: "Widget");

            migrationBuilder.DropIndex(
                name: "IX_Widget_WidgetTitle",
                table: "Widget");

            migrationBuilder.RenameColumn(
                name: "ShopID",
                table: "Widget",
                newName: "ShopId");

            migrationBuilder.RenameIndex(
                name: "IX_Widget_ShopID",
                table: "Widget",
                newName: "IX_Widget_ShopId");

            migrationBuilder.AlterColumn<int>(
                name: "ShopId",
                table: "Widget",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Widget_WidgetTitle",
                table: "Widget",
                column: "WidgetTitle");

            migrationBuilder.AddForeignKey(
                name: "FK_Widget_Shop_ShopId",
                table: "Widget",
                column: "ShopId",
                principalTable: "Shop",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Widget_Shop_ShopId",
                table: "Widget");

            migrationBuilder.DropIndex(
                name: "IX_Widget_WidgetTitle",
                table: "Widget");

            migrationBuilder.RenameColumn(
                name: "ShopId",
                table: "Widget",
                newName: "ShopID");

            migrationBuilder.RenameIndex(
                name: "IX_Widget_ShopId",
                table: "Widget",
                newName: "IX_Widget_ShopID");

            migrationBuilder.AlterColumn<int>(
                name: "ShopID",
                table: "Widget",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Widget_WidgetTitle",
                table: "Widget",
                column: "WidgetTitle",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Widget_Shop_ShopID",
                table: "Widget",
                column: "ShopID",
                principalTable: "Shop",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
