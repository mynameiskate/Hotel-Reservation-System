using Services.Models;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IHotelPageService
    {
        Task<PageModel> GetHotelPage(int pageNumber = 1, 
                                     int? pageSize = null, 
                                     FilterModel filters = null);
    }
}
