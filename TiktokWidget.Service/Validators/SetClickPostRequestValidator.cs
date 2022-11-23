using FluentValidation;
using TiktokWidget.Service.Dtos.Requests.Shops;

namespace TiktokWidget.Service.Validators
{
    public class SetClickPostRequestValidator : AbstractValidator<SetClickPostRequest>
    {
        public SetClickPostRequestValidator()
        {
            RuleFor(x => x.Image).NotEmpty();
            RuleFor(x => x.PostId).NotEmpty();
        }
    }
}
