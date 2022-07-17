using FluentValidation;
using System.Linq;
using TiktokWidget.Service.Dtos.Requests.Widget;

namespace TiktokWidget.Service.Validators
{
    public class RemoveWidgetRequestValidator : AbstractValidator<RemoveWidgetRequest>
    {
        public RemoveWidgetRequestValidator()
        {
            RuleFor(x => x.WidgetIds).Must(x => x.Any()).NotEmpty().NotNull();
        }
    }
}
