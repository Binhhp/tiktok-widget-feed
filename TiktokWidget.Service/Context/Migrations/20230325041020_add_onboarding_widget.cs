using Microsoft.EntityFrameworkCore.Migrations;

namespace TiktokWidget.Service.Context.Migrations
{
    public partial class add_onboarding_widget : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DisableShowItems",
                table: "Widget",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ItemSorts",
                table: "Widget",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DisableShowItems",
                table: "InstagramWidget",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ItemSorts",
                table: "InstagramWidget",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DisableShowItems",
                table: "Widget");

            migrationBuilder.DropColumn(
                name: "ItemSorts",
                table: "Widget");

            migrationBuilder.DropColumn(
                name: "DisableShowItems",
                table: "InstagramWidget");

            migrationBuilder.DropColumn(
                name: "ItemSorts",
                table: "InstagramWidget");
        }
    }
}
