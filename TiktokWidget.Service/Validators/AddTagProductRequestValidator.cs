using FluentValidation;
using System.Linq;
using TiktokWidget.Service.Dtos.Requests;

namespace TiktokWidget.Service.Validators
{
    public class AddTagProductRequestValidator : AbstractValidator<AddTagProductRequest>
    {
        public AddTagProductRequestValidator()
        {
            When(x => x.Products.Any(), () =>
            {
                RuleForEach(x => x.Products).ChildRules(product =>
                {
                    product.RuleFor(u => u.Handle).NotEmpty().NotNull();
                    product.RuleFor(u => u.ShopId).NotEmpty().NotNull();
                    product.RuleFor(u => u.Id).NotEmpty().NotNull();
                    product.RuleFor(u => u.Image).NotEmpty().NotNull();
                    product.RuleFor(u => u.Prices).NotEmpty().NotNull();
                    product.RuleFor(u => u.Title).NotEmpty().NotNull();
                });
            });
        }
    }
}
