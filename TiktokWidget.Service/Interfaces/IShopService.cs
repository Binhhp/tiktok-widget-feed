
using Orichi.IoC.Containers.LifeScoped;
using Orichi.IoC.Logging.Models.Models;
using ShopifySharp;
using System;
using System.Linq;
using System.Threading.Tasks;
using TiktokWidget.Service.Dtos.Requests.Shops;
using TiktokWidget.Service.Dtos.Responses.Shop;
using TiktokWidget.Service.Dtos.Responses.Shops;
using TiktokWidget.Service.Dtos.Responses.TikTokWidgets;
using TiktokWidget.Service.Entities;
using TiktokWidget.Service.ViewModels;

namespace TiktokWidget.Service.Interfaces
{
    public interface IShopService : IScopedDependency
    {
        IQueryable<ShopEntity> Get();
        IQueryable<ShopEntity> GetByDomain(string domain);
        Task<AddShopResponse> CreateAsync(ShopCreateDto request);
        Task<ResponseBase> UpdateAsync(ShopCreateDto request, string domain);
        Task<ResponseBase> DeleteAsync(string domain);
        IQueryable<ShopConfigurationEntity> GetConfiguration(string domain);
        Task UpdateConfigurationAsync(string domain, CreateShopConfigurationRequest request);
        Task ExternalAuthenticationAsync(string domain, string code);
        Task Test(string domain);
        IQueryable<Theme> GetThemes(string domain);
        Task<PostFeedbackResponse> FeedbackAsync(string domain, PostFeedbackRequest postFeedbackRequest);
        IQueryable<CoursesEntity> GetCources();
        IQueryable<BannerEnitty> GetBanners();
        IQueryable<PostViewModel> GetPosts(DateTime startTime, DateTime endTime);
    }
}
