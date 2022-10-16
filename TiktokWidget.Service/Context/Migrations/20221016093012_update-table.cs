using Microsoft.EntityFrameworkCore.Migrations;

namespace TiktokWidget.Service.Context.Migrations
{
    public partial class updatetable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Setting_Color",
                table: "InstagramWidget",
                newName: "Setting_LoadMoreBackGround");

            migrationBuilder.RenameColumn(
                name: "Setting_BackGround",
                table: "InstagramWidget",
                newName: "Setting_ItemColor");

            migrationBuilder.AddColumn<string>(
                name: "Setting_ItemBackGround",
                table: "InstagramWidget",
                type: "nvarchar(18)",
                maxLength: 18,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Setting_LabelLoadMore",
                table: "InstagramWidget",
                type: "nvarchar(155)",
                maxLength: 155,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Setting_ItemBackGround",
                table: "InstagramWidget");

            migrationBuilder.DropColumn(
                name: "Setting_LabelLoadMore",
                table: "InstagramWidget");

            migrationBuilder.RenameColumn(
                name: "Setting_LoadMoreBackGround",
                table: "InstagramWidget",
                newName: "Setting_Color");

            migrationBuilder.RenameColumn(
                name: "Setting_ItemColor",
                table: "InstagramWidget",
                newName: "Setting_BackGround");
        }
    }
}
