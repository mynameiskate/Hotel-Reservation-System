using Services.Models;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IHotelPageService
    {
        Task<PageModel> GetHotelPage(PageRequestModel request);
    }
}
