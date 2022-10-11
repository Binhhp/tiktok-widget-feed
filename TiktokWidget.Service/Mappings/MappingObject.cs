using AutoMapper;
using TiktokWidget.Service.Context.Entities;
using TiktokWidget.Service.Context.Entities.ValueObjects;
using TiktokWidget.Service.Dtos;
using TiktokWidget.Service.Dtos.Requests.InstagramWidgets;
using TiktokWidget.Service.Dtos.Requests.Shops;
using TiktokWidget.Service.Dtos.Requests.TikTokWidgets;
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

            CreateMap<UpdateWidgetRequest, TikTokWidgetEntity>()
                .ForMember(x => x.Setting, opt => opt.MapFrom(src => new TikTokOptions
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
                })).ForMember(x => x.Header, opt => opt.MapFrom(src => new HeaderOptions
                {
                    Caption = src.Caption,
                    Title = src.Title,
                    Enable = src.Enable,
                }));
            // widget
            CreateMap<WidgetCreateDto, TikTokWidgetEntity>()
                .ForMember(x => x.CreateDate, opt => opt.MapFrom(src => System.DateTime.Now))
                .ForMember(x => x.ModifyDate, opt => opt.MapFrom(src => System.DateTime.Now))
                .ForMember(x => x.Setting, opt => opt.MapFrom(src => new TikTokOptions
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
            })).ForMember(x => x.Header, opt => opt.MapFrom(src => new HeaderOptions
            {
                Caption = src.Caption,
                Title = src.Title,
                Enable = src.Enable,
            }));

            //Map Request Instagram Widget to Entity
            CreateMap<CreateInstagramWidgetRequest, InstagramWidgetEntity>()
                .ForMember(x => x.CreateDate, opt => opt.MapFrom(src => System.DateTime.Now))
                .ForMember(x => x.ModifyDate, opt => opt.MapFrom(src => System.DateTime.Now))
                .ForMember(x => x.Setting, opt => opt.MapFrom(src => new InstagramOptions
                {
                    LabelReadMore = src.Options.LabelReadMore,
                    BackGround = src.Options.BackGround,
                    Color = src.Options.Color,
                    LayoutType = src.Options.LayoutType,
                    NumberPerRow = src.Options.NumberPerRow,
                    ShowNetworkIcon = src.Options.ShowNetworkIcon,
                    LimitItems = src.Options.LimitItems,
                })).ForMember(x => x.Header, opt => opt.MapFrom(src => new HeaderInstagramOptions
                {
                    Title = src.Header.Title,
                    Enable = src.Header.Enable
                }));


            CreateMap<ShopCreateDto, ShopEntity>();
        }
    }
}
