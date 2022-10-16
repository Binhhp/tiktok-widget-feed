using Orichi.IoC.Containers.LifeScoped;
using Orichi.IoC.Logging.Models.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TiktokWidget.Service.Dtos.Requests.TikTokWidgets;
using TiktokWidget.Service.Entities;

namespace TiktokWidget.Service.Interfaces
{
    public interface IProductService : IScopedDependency
    {
        Task AddAsync(IEnumerable<ProductEntity> products);
        Task<ResponseBase> AddAsync(AddProductRequest request);
        Task<ResponseBase> RemoveAsync(string key);
        Task<ResponseBase> UpdateAsync(string key, UpdateProductRequest request);
        IQueryable<ProductEntity> Get(string domain, string pageIndex);
        int GetPageIndex(string domain);
        IQueryable<ProductEntity> GetById(string key);
    }
}
