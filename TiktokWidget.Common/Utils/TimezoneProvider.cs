using System;
using TimeZoneConverter;

namespace TiktokWidget.Common.Utils
{
    public class TimezoneProvider
    {
        public static DateTime ConvertIANATimezone(DateTime dateTimeInput, string ianaTimezone)
        {
            try
            {
                var tz = TZConvert.IanaToWindows(ianaTimezone);
                var timezoneInfo = TimeZoneInfo.FindSystemTimeZoneById(tz);
                if (timezoneInfo == null) return dateTimeInput;
                var result = TimeZoneInfo.ConvertTime(dateTimeInput, timezoneInfo);
                return result;
            }
            catch
            {
                return dateTimeInput;
            }
        }
    }
}
