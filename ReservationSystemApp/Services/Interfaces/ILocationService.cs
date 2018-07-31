using Services.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface ILocationService
    {
        Task<IEnumerable<LocationModel>> GetLocationList();
    }
}
