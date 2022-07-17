using FluentValidation;
using TiktokWidget.Service.Dtos.Requests;

namespace TiktokWidget.Service.Validators
{
    public class CreateShopConfigurationRequestValidator : AbstractValidator<CreateShopConfigurationRequest>
    {
        public CreateShopConfigurationRequestValidator()
        {
            RuleFor(x => x.Theme).NotEmpty().NotNull();
            RuleFor(x => x.Image).NotEmpty().NotNull();
            RuleFor(x => x.ButtonPosition).NotEmpty().NotNull();
            RuleFor(x => x.TikTokUserName).NotEmpty().NotNull();
        }
    }
}
