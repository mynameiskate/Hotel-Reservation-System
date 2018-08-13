using Services.Models;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IReservationService
    {
        Task UpdateReservation(ReservationModel reservation);
        Task<ReservationModel> Book(string userEmail, ReservationModel reservation);
    }
}
