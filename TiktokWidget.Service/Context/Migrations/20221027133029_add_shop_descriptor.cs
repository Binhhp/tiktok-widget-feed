using Microsoft.EntityFrameworkCore.Migrations;

namespace TiktokWidget.Service.Context.Migrations
{
    public partial class add_shop_descriptor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Setting_LoadMoreBackGround",
                table: "InstagramWidget",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(18)",
                oldMaxLength: 18,
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "ShopDescriptor",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Feedback = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ShopId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShopDescriptor", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ShopDescriptor_Shop_ShopId",
                        column: x => x.ShopId,
                        principalTable: "Shop",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ShopDescriptor_ShopId",
                table: "ShopDescriptor",
                column: "ShopId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ShopDescriptor");

            migrationBuilder.AlterColumn<string>(
                name: "Setting_LoadMoreBackGround",
                table: "InstagramWidget",
                type: "nvarchar(18)",
                maxLength: 18,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }
    }
}
