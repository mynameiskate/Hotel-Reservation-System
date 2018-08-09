using Services.Models;
using Services.Models.PageModels;
using Services.Models.RequestModels;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IHotelService
    {
        Task<ReservationModel> Book(int roomId, string email);
        Task<PageModel<HotelRoomModel>> GetHotelRooms(int hotelId, FilteredRoomsRequestModel request);
        Task<HotelModel> GetHotelInfo(int id);
        void Delete(int id);
        Task<PageModel<HotelModel>> GetHotelPage(FilteredHotelsRequestModel request);
    }
}
