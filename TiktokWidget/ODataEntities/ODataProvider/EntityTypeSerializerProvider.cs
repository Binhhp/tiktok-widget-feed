using Microsoft.AspNet.OData.Formatter.Serialization;
using Microsoft.AspNetCore.Http;
using Microsoft.OData.Edm;
using System;

namespace TiktokWidget.ODataEntities.ODataProvider
{
    public class EntityTypeSerializerProvider : DefaultODataSerializerProvider
    {
        public EntityTypeSerializerProvider(IServiceProvider rootContainer) : base(rootContainer)
        {
        }
        public override ODataSerializer GetODataPayloadSerializer(Type type, HttpRequest request)
        {
            return base.GetODataPayloadSerializer(type, request);
        }
        public override ODataEdmTypeSerializer GetEdmTypeSerializer(IEdmTypeReference edmType)
        {
            if (edmType is IEdmPrimitiveTypeReference edmPrimitiveTypeReference)
            {
                var primitiveKind = edmPrimitiveTypeReference.PrimitiveKind();
                switch (primitiveKind)
                {
                    case EdmPrimitiveTypeKind.DateTimeOffset:
                    case EdmPrimitiveTypeKind.Date:
                        return new DateTimePrimitiveSerializer();
                }
            }
            var result = base.GetEdmTypeSerializer(edmType);
            return result;
        }
    }
}
