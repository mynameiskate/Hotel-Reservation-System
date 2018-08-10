using Services.Models;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IReservationService
    {
        Task<ReservationModel> Book(string userEmail, ReservationModel reservation);
    }
}
