using System;
using System.ComponentModel.DataAnnotations;

namespace TiktokWidget.Service.ViewModels
{
    public class PostViewModel
    {
        [Key]
        public string Id { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public Int64 Impression { get; set; }
        public Int64 Clicks { get; set; }
    }
}
