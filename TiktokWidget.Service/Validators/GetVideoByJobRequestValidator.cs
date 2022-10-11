using FluentValidation;
using TiktokWidget.Service.Dtos.Requests.TikTokWidgets;

namespace TiktokWidget.Service.Validators
{
    public class GetVideoByJobRequestValidator : AbstractValidator<GetVideoByJobRequest>
    {
        public GetVideoByJobRequestValidator()
        {
            RuleFor(x => x.Data).NotEmpty().NotNull();
        }
    }
}
