using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TiktokWidget.Service.Entities
{
    public class ShopEntity
    {
        public int ID { get; set; }
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
        public IEnumerable<WidgetEntity> Widgets { get; set; }
        public ShopConfigurationEntity ShopConfiguration { get; set; }
        public ICollection<ProductEntity> Products { get; set; }
    }
}