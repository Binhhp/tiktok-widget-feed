using Microsoft.AspNet.OData.Formatter.Serialization;
using Microsoft.OData;
using Microsoft.OData.Edm;
using System;
using TiktokWidget.Common.Utils;

namespace TiktokWidget.ODataEntities.ODataProvider
{
    public class DateTimePrimitiveSerializer : ODataPrimitiveSerializer
    {
        public override ODataPrimitiveValue CreateODataPrimitiveValue(object graph, IEdmPrimitiveTypeReference primitiveType, ODataSerializerContext writeContext)
        {
            var baseValue = base.CreateODataPrimitiveValue(graph, primitiveType, writeContext);
            try
            {
                var queryTimezone = writeContext.Request?.Headers?["tz"].ToString();
                if (string.IsNullOrEmpty(queryTimezone))
                {
                    var timeZoneFromQuery = writeContext.Request?.Query?["tz"].ToString();
                    if(!string.IsNullOrEmpty(timeZoneFromQuery)) queryTimezone = timeZoneFromQuery;
                }
               
                if (!string.IsNullOrEmpty(queryTimezone))
                {
                    if (baseValue.Value is DateTime dateTime)
                    {
                        var timeConverted = TimezoneProvider.ConvertIANATimezone(dateTime, queryTimezone);
                        return new ODataPrimitiveValue(timeConverted);
                    }
                    else if(baseValue.Value is DateTimeOffset dateTimeOffset)
                    {
                        var timeConverted = TimezoneProvider.ConvertIANATimezone(dateTimeOffset.DateTime, queryTimezone);
                        return new ODataPrimitiveValue(new DateTimeOffset(timeConverted));
                    }
                }
            }
            catch { }
            return baseValue;
        }
    }
}
