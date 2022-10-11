namespace TiktokWidget.Common.Constants
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
}
