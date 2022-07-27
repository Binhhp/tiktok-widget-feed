using FluentValidation;
using TiktokWidget.Service.Dtos;

namespace TiktokWidget.Service.Validators
{
    public class WidgetCreateDtoValidator : AbstractValidator<WidgetCreateDto>
    {
        public WidgetCreateDtoValidator()
        {
            RuleFor(x => x.AccentColor).NotEmpty().NotNull();
            RuleFor(x => x.BackGround).NotEmpty().NotNull();
            RuleFor(x => x.Color).NotEmpty().NotNull();
            RuleFor(x => x.ValueSource).NotEmpty().NotNull();
            RuleFor(x => x.SourceType).NotNull();
            RuleFor(x => x.WidgetTitle).NotEmpty().NotNull();
            RuleFor(x => x.NumberPerRow).LessThan(15).GreaterThan(0);
            RuleFor(x => x.LayoutType).LessThan(5);
        }
    }
}
