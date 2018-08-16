using DataLayer.Entities;
using Services.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface ILocationService
    {
        Task<IEnumerable<LocationModel>> GetLocationList();
        Task<Location> GetLocation(LocationModel locationModel);
        Task<Location> AddLocation(LocationModel locationModel);
    }
}
