using System;

namespace TiktokWidget.Service.Dtos.Responses.Shop
{
    public class ShopCreateDto
    {
        public long ShopID { get; set; }
        public string Domain { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public int StepSetup { get; set; }
        public string Currency { get; set; }
        public bool GetData { get; set; }
        public int Status { get; set; }
        public string ConfirmUrl { get; set; }
        public int? TrialDay { get; set; }
        public long ChargeId { get; set; }
        public long InstalledDate { get; set; }
        public string Phone { get; set; }
        public string Email2 { get; set; }
        public string Country { get; set; }
        public string PlanName { get; set; }
        public string TimeZone { get; set; }
    }
}
