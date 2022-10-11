using FluentValidation;
using TiktokWidget.Service.Dtos.Requests.TikTokWidgets;

namespace TiktokWidget.Service.Validators
{
    public class AddJobRequestValidator : AbstractValidator<AddJobRequest>
    {
        public AddJobRequestValidator()
        {
            RuleFor(x => x.Data).NotEmpty().NotNull();
        }
    }
}
