namespace Orichi.IoC.Constants
{
    public enum ResponseCode
    {
        Success = 200,
        PartialSuccess = 320010,
        BadRequest = 410010,
        RequireFieldNullEmpty = 410011,
        Conflict = 410012,
        InvalidDataFormat = 410013,
        NotFound = 410014,
        CannotDelete = 410015,
        InternalServerError = 4100500,
        ServiceUnavailable = 510011,
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
