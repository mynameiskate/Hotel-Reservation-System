using DataLayer.Entities;
using Services.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface ILocationService
    {
        Task<IEnumerable<LocationModel>> GetAllLocations();
        Task<IEnumerable<LocationModel>> GetHotelLocations();
        Task<Location> GetLocation(LocationModel locationModel);
        Task<Location> AddLocation(LocationModel locationModel);
    }
}
