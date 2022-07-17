
using System.Linq;
using System.Threading.Tasks;
using TiktokWidget.Service.Dtos;
using TiktokWidget.Service.Dtos.Requests;
using TiktokWidget.Service.Dtos.Response;
using TiktokWidget.Service.Entities;

namespace TiktokWidget.Service.Interfaces
{
    public interface IShopService
    {
        IQueryable<ShopEntity> Get();
        IQueryable<ShopEntity> GetByDomain(string domain);
        Task<AddShopResponseBase> CreateAsync(ShopCreateDto request);
        Task<ResponseBase> UpdateAsync(ShopCreateDto request, string domain);
        Task<ResponseBase> DeleteAsync(string domain);
        IQueryable<ShopConfigurationEntity> GetConfiguration(string domain);
        Task UpdateConfigurationAsync(string domain, CreateShopConfigurationRequest request);
        Task ExternalAuthenticationAsync(string domain, string code);
        Task Test(string domain);
    }
}
