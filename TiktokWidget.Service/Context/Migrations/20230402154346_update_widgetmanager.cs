using Microsoft.EntityFrameworkCore.Migrations;

namespace TiktokWidget.Service.Context.Migrations
{
    public partial class update_widgetmanager : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Setting_DisableTopNewItems",
                table: "Widget",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Setting_NumberItems",
                table: "Widget",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Setting_DisableTopNewItems",
                table: "InstagramWidget",
                type: "bit",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Setting_DisableTopNewItems",
                table: "Widget");

            migrationBuilder.DropColumn(
                name: "Setting_NumberItems",
                table: "Widget");

            migrationBuilder.DropColumn(
                name: "Setting_DisableTopNewItems",
                table: "InstagramWidget");
        }
    }
}
