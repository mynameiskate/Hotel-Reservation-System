using DataLayer.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IHotelService
    {
        Task<List<Hotel>> GetHotelList();
        void Delete(int id);
    }
}
