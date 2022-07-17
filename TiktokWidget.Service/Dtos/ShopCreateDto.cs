using System;

namespace TiktokWidget.Service.Dtos
{
    public class ShopCreateDto
    {
        public Int64 ShopID { get; set; }
        public string Domain { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public int StepSetup { get; set; }
        public string Currency { get; set; }
        public bool GetData { get; set; }
        public int Status { get; set; }
        public string ConfirmUrl { get; set; }
        public int? TrialDay { get; set; }
        public Int64 ChargeId { get; set; }
        public Int64 InstalledDate { get; set; }
        public string Phone { get; set; }
        public string Email2 { get; set; }
        public string Country { get; set; }
        public string PlanName { get; set; }
        public string TimeZone { get; set; }
    }
}
