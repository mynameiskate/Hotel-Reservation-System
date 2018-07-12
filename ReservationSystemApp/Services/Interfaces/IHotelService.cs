using DataLayer.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IHotelService
    {
        Task<IEnumerable<Hotel>> GetHotelList();
        Task<string> GetHotelListAsJson();
        void Delete(int id);
    }
}
