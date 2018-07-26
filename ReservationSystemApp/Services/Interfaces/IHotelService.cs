using DataLayer.Entities;
using Services.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IHotelService
    {
        Task<IEnumerable<HotelModel>> GetHotelList();
        Task<HotelModel> GetHotelInfo(int id);
        Task<IEnumerable<LocationModel>> GetLocationList();
        void Delete(int id);
    }
}
