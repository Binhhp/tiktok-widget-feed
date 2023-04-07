using AutoMapper;
using System;
using TiktokWidget.Service.Dtos.Requests.InstagramWidgets;
using TiktokWidget.Service.Dtos.Requests.Shops;
using TiktokWidget.Service.Dtos.Requests.TikTokWidgets;
using TiktokWidget.Service.Dtos.Requests.Widget;
using TiktokWidget.Service.Dtos.Responses.Shop;
using TiktokWidget.Service.Dtos.Responses.TikTokWidgets;
using TiktokWidget.Service.Entities;
using TiktokWidget.Service.Entities.ValueObjects;
using TiktokWidget.Service.ViewModels;

namespace TiktokWidget.Service.Mappings
{
    public class MappingObject : Profile
    {

        public MappingObject()
        {
            CreateMap<CreateShopConfigurationRequest, ShopConfigurationEntity>()
                .ForMember(x => x.Id, opt => opt.MapFrom(src => Guid.NewGuid().ToString()));

            CreateMap<ProductDto, ProductEntity>()
                .ForMember(x => x.Id, opt => opt.MapFrom(src => Guid.NewGuid().ToString()));

            CreateMap<InstagramWidgetEntity, InstagramWidgetViewModel>();
            CreateMap<TikTokWidgetEntity, TiktokWidgetViewModel>();

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
                    CustomCss = src.CustomCss,
                    NumberItems = src.NumberItems,
                })).ForMember(x => x.Header, opt => opt.MapFrom(src => new HeaderOptions
                {
                    Caption = src.Caption,
                    Title = src.Title,
                    Enable = src.Enable,
                }));
            // widget
            CreateMap<WidgetCreateDto, TikTokWidgetEntity>()
                .ForMember(x => x.CreateDate, opt => opt.MapFrom(src => DateTime.Now))
                .ForMember(x => x.ModifyDate, opt => opt.MapFrom(src => DateTime.Now))
                .ForMember(x => x.Id, opt => opt.MapFrom(src => !string.IsNullOrEmpty(src.Id) ? src.Id : Guid.NewGuid().ToString()))
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
                    CustomCss = src.CustomCss,
                    NumberItems = src.NumberItems,
                })).ForMember(x => x.Header, opt => opt.MapFrom(src => new HeaderOptions
                {
                    Caption = src.Caption,
                    Title = src.Title,
                    Enable = src.Enable,
                }));

            //Map Request Instagram Widget to Entity
            CreateMap<CreateInstagramWidgetRequest, InstagramWidgetEntity>()
                .ForMember(x => x.CreateDate, opt => opt.MapFrom(src => DateTime.Now))
                .ForMember(x => x.ModifyDate, opt => opt.MapFrom(src => DateTime.Now))
                .ForMember(x => x.Id, opt => opt.MapFrom(src => !string.IsNullOrEmpty(src.Id) ? src.Id : Guid.NewGuid().ToString()))
                .ForMember(x => x.Setting, opt => opt.MapFrom(src => new InstagramOptions
                {
                    LabelReadMore = src.Options.LabelReadMore,
                    LabelLoadMore = src.Options.LabelLoadMore,
                    LoadMoreBackGround = src.Options.LoadMoreBackGround,
                    ItemBackGround = src.Options.ItemBackGround,
                    ItemColor = src.Options.ItemColor,
                    LayoutType = src.Options.LayoutType,
                    NumberPerRow = src.Options.NumberPerRow,
                    ShowNetworkIcon = src.Options.ShowNetworkIcon,
                    LimitItems = src.Options.LimitItems,
                })).ForMember(x => x.Header, opt => opt.MapFrom(src => new HeaderInstagramOptions
                {
                    Title = src.Header.Title,
                    Enable = src.Header.Enable
                }));


            CreateMap<ShopCreateDto, ShopEntity>()
                .ForMember(x => x.ID, opt => opt.MapFrom(src => Guid.NewGuid().ToString()));
        }
    }
}
