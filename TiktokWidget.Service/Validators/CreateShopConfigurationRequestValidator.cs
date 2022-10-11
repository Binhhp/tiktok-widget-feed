using FluentValidation;
using TiktokWidget.Service.Dtos.Requests.Shops;

namespace TiktokWidget.Service.Validators
{
    public class CreateShopConfigurationRequestValidator : AbstractValidator<CreateShopConfigurationRequest>
    {
        public CreateShopConfigurationRequestValidator()
        {
            RuleFor(x => x.Theme).NotEmpty().NotNull();
            RuleFor(x => x.Image).NotEmpty().NotNull();
            RuleFor(x => x.TikTokUserName).NotEmpty().NotNull();
        }
    }
}
