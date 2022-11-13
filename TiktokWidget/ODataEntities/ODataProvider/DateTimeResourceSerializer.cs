using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Formatter.Serialization;
using Microsoft.OData;
using Microsoft.OData.Edm;
using System;
using System.Linq;
using TiktokWidget.Common.Utils;

namespace TiktokWidget.ODataEntities.ODataProvider
{
    public class DateTimeResourceSerializer : ODataResourceSerializer
    {
        public DateTimeResourceSerializer(ODataSerializerProvider serializerProvider) : base(serializerProvider)
        {
        }

        public override ODataProperty CreateStructuralProperty(IEdmStructuralProperty structuralProperty, ResourceContext resourceContext)
        {
            var baseValue = base.CreateStructuralProperty(structuralProperty, resourceContext);
            try
            {
                if(baseValue != null && (baseValue.Value is DateTime || baseValue.Value is DateTimeOffset))
                {
                    var queryTimezone = resourceContext.Request?.Headers?["tz"].ToString();
                    var obj = resourceContext.ResourceInstance.GetType();
                    var propertyOfObj = obj.GetProperties().FirstOrDefault(x => x.Name.ToLower() == structuralProperty.Name);
                    if (propertyOfObj != null)
                    {
                        var attributeNonFormater = propertyOfObj.GetCustomAttributes(typeof(NonFormater), true);
                        if(attributeNonFormater != null && attributeNonFormater.Length > 0) return baseValue;
                    }
                    if (string.IsNullOrEmpty(queryTimezone))
                    {
                        var timeZoneFromQuery = resourceContext.Request?.Query?["tz"].ToString();
                        if (!string.IsNullOrEmpty(timeZoneFromQuery)) queryTimezone = timeZoneFromQuery;
                    }

                    if (!string.IsNullOrEmpty(queryTimezone))
                    {
                        if (baseValue.Value is DateTime dateTime)
                        {
                            var timeConverted = TimezoneProvider.ConvertIANATimezone(dateTime, queryTimezone);
                            baseValue.Value = timeConverted;
                        }
                        else if (baseValue.Value is DateTimeOffset dateTimeOffset)
                        {
                            var timeConverted = TimezoneProvider.ConvertIANATimezone(dateTimeOffset.DateTime, queryTimezone);
                            baseValue.Value = new DateTimeOffset(timeConverted);
                        }
                    }
                }
            }
            catch 
            {

            }
            return baseValue;
        }
    }
}
