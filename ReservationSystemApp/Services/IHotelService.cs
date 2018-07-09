using DataLayer.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Repositories
{
    public interface IHotelService
    {
        Task<List<Hotel>> GetHotelList();
    }
}
