using Services.Models;
using Services.Models.PageModels;
using Services.Models.RequestModels;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IHotelService
    {
        Task<PageModel<HotelRoomModel>> GetHotelRooms(int hotelId, RoomFilterModel request);
        Task<HotelModel> GetHotelInfo(int id);
        void Delete(int id);
        Task<PageModel<HotelModel>> GetHotelPage(HotelFilterModel request);
    }
}
