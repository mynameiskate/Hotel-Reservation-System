using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Services.Interfaces;
using Services.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ReservationSystemApp.Controllers
{
    [Route("api/locations")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly ILogger<HotelController> _logger;
        private readonly ILocationService _locationService;

        public LocationController(ILogger<HotelController> logger,
                                  ILocationService locationService)
        {
            _logger = logger;
            _locationService = locationService;
        }

        // GET: api/hotels/locations
        [HttpGet]
        public async Task<IEnumerable<LocationModel>> GetLocationList()
        {
            var locations = await _locationService.GetLocationList();
            return locations;
        }
    }
}
