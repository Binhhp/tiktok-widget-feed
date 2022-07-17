using AutoMapper;
using ShopifySharp;
using TiktokWidget.Service.Dtos;
using TiktokWidget.Service.Dtos.Requests;
using TiktokWidget.Service.Dtos.Requests.Widget;
using TiktokWidget.Service.Entities;
using TiktokWidget.Service.Entities.ValueObjects;

namespace TiktokWidget.Service.Mappings
{
    public class MappingObject : Profile
    {

        public MappingObject()
        {
            CreateMap<CreateShopConfigurationRequest, ShopConfigurationEntity>();
            CreateMap<ProductDto, ProductEntity>();

            CreateMap<UpdateWidgetRequest, WidgetEntity>()
                .ForMember(x => x.Setting, opt => opt.MapFrom(src => new SettingValueObject
                {
                    LabelReadMore = src.LabelReadMore,
                    ShowProfile = src.ShowProfile,
                    AccentColor = src.AccentColor,
                    BackGround = src.BackGround,
                    Color = src.Color,
                    LabelViewMore = src.LabelViewMore,
                    LayoutType = src.LayoutType,
                    NumberPerRow = src.NumberPerRow,
                    ShowNetworkIcon = src.ShowNetworkIcon,
                })).ForMember(x => x.Header, opt => opt.MapFrom(src => new HeaderValueObject
                {
                    Caption = src.Caption,
                    Title = src.Title,
                    Enable = src.Enable,
                }));
            // widget
            CreateMap<WidgetCreateDto, WidgetEntity>()
                .ForMember(x => x.CreateDate, opt => opt.MapFrom(src => System.DateTime.Now))
                .ForMember(x => x.ModifyDate, opt => opt.MapFrom(src => System.DateTime.Now))
                .ForMember(x => x.Setting, opt => opt.MapFrom(src => new SettingValueObject
            {
                LabelReadMore = src.LabelReadMore,
                ShowProfile = src.ShowProfile,
                AccentColor = src.AccentColor,
                BackGround = src.BackGround,
                Color = src.Color,
                LabelViewMore = src.LabelViewMore,
                LayoutType = src.LayoutType,
                NumberPerRow = src.NumberPerRow,
                ShowNetworkIcon = src.ShowNetworkIcon,
            })).ForMember(x => x.Header, opt => opt.MapFrom(src => new HeaderValueObject
            {
                Caption = src.Caption,
                Title = src.Title,
                Enable = src.Enable,
            }));

            CreateMap<ShopCreateDto, ShopEntity>();
        }
    }
}
