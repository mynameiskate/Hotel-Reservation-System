using DataLayer.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IHotelService
    {
        Task<IEnumerable<Hotel>> GetHotelList();
        Task<Hotel> GetHotelInfo(int id);
        void Delete(int id);
    }
}
