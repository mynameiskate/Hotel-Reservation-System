using Services.Models;
using Services.Models.PageModels;
using Services.Models.RequestModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IHotelService
    {
        Task<ServiceModel> CreateHotelService(int hotelId, ServiceModel service);
        Task<List<ServiceModel>> GetAvailableServices(int hotelId);
        Task<List<ServiceModel>> GetPossibleServices();
        Task<PageModel<HotelRoomModel>> GetHotelRooms(int hotelId, FilteredRoomsRequestModel request);
        Task<HotelModel> GetHotelInfo(int id);
        void Delete(int id);
        Task<PageModel<HotelModel>> GetHotelPage(FilteredHotelsRequestModel request);
        Task UpdateHotelInfo(HotelModel hotelInfo);
    }
}
