using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace TiktokWidget.Service.Models
{
    public class TiktokVideoViewModel
    {
        [Key]
        public string Guid { get; set; }
        public string Desc { get; set; }
        public IEnumerable<string> HashTags { get; set; }
        public string Video { get; set; }
        public string Image { get; set; }
        public DateTime? Date { get; set; }
    }
}
