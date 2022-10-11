

namespace TiktokWidget.Common.Constants
{
    public static class ErrorCode
    {
        public const string BadRequest = "410010";
        public const string RequireFieldNullEmpty = "410011";
        public const string Conflict = "410012";
        public const string InvalidDataFormat = "410013";
        public const string NotFound = "410014";
        public const string InvalidMaxLength = "410015";
        public const string CannotDelete = "410016";
        public const string InvalidMinLength = "410017";
        public const string InvalidMaxValue = "410019";
        public const string InvalidMinValue = "410020";
        public const string InternalServerError = "4100500";
        public const string Forbidden = "410023";
        public const string ServiceUnavailable = "510011";
    }
    public static class ErrorMessage
    {
        public const string BadRequest = "Bad Request";
        public const string HandlerCallbackError = "Handler Callback Error";
        public const string RequireFieldNullEmpty = "{0} cannot be empty";
        public const string Conflict = "{0} already exists";
        public const string InvalidDataFormat = " {0} invalid format";
        public const string NotFound = "{0} not found";
        public const string InvalidMaxLength = "{0} text length exceeds maximum allowed text (string)";
        public const string CannotDelete = "Cannot delete {0}";
        public const string InvalidMinLength = "{0} Text length (string) is smaller than minimum allowed text";
        public const string InvalidMaxValue = "{0} Input (number) exceeds max value";
        public const string InvalidMinValue = "{0} Input (number) is smaller than min value";
        public const string InternalServerError = "Internal server error";
        public const string ServiceUnavailable = "Service Unavailable";
    }
    public static class InfoMessage
    {
        public const string HandleSuccess = "Handle Success";
        public const string Start = "Start => {0}";
        public const string End = "End => {0}";
        public const string InvalidInput = "Invalid Input";
        public const string ObjectIsNull = "{0} is null!";
    }
}
