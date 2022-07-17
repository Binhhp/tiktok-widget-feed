using System.ComponentModel.DataAnnotations;
using TiktokWidget.Common.Enums;

namespace TiktokWidget.Service.Entities
{
    public class JobEntity : BaseEntity<int>
    {
        public SourceTypeEnum Type { get; set; }
        [Required]
        [StringLength(500)]
        public string Data { get; set; }
    }
}
