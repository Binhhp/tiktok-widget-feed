using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TiktokWidget.Common.Constants;

namespace TiktokWidget.Service.Validators
{
    public class ValidatorFilter : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            if (!context.ModelState.IsValid)
            {
                var errorsInModelValue = context.ModelState
                    .Where(x => x.Value.Errors.Count > 0)
                    .ToDictionary(key => key.Key, kvp => kvp.Value.Errors.Select(x => x.ErrorMessage)).ToArray();

                var errorResponse = new ErrorResponseValidator();
                var errors = new List<ErrorValidator>();
                foreach (var error in errorsInModelValue)
                {
                    foreach (var subError in error.Value)
                    {
                        var errorModel = new ErrorValidator
                        {
                            Field = error.Key,
                            ErrorMessage = subError
                        };

                        errors.Add(errorModel);
                    }
                }
                errorResponse.ErrorCode = (int)ResponseCode.RequireFieldNullEmpty;
                errorResponse.Errors = errors;
                context.Result = new BadRequestObjectResult(errorResponse);
                return;
            }

            await next();
        }
    }
    public class ErrorResponseValidator
    {
        public int ErrorCode { get; set; }
        public List<ErrorValidator> Errors { get; set; }
    }
    public class ErrorValidator
    {
        public string Field { get; set; }
        public string ErrorMessage { get; set; }
    }
}
