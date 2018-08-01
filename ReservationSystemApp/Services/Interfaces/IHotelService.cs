using Services.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IHotelService
    {
        Task<HotelModel> GetHotelInfo(int id);
        void Delete(int id);
        Task<PageModel> GetHotelPage(PageRequestModel request);
    }
}
