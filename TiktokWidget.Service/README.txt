//
Script add mirgation context: 
Add-Migration init-table -Context TiktokWidgetDbContext -o Context/Migrations
//
Script update database context:
Update-Database -Context TiktokWidgetDbContext
//
Remove context:
Remove-Migration -Context TiktokWidgetDbContext

