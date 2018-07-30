using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using Services.Models;

namespace ReservationSystemApp.Controllers
{
    [Route("api/hotels")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        private readonly IHotelService _hotelService;
        private readonly IHotelPageService _pageService;

        public HotelController(IHotelService hotelService, 
                               IHotelPageService pageService)
        {
            _hotelService = hotelService;
            _pageService = pageService;
        }

        // GET: api/hotels/?
        [HttpGet]
        public async Task<PageModel> GetHotelList([FromQuery]int page, [FromQuery]FilterModel filters)
        {
            return await _pageService.GetHotelPage(page, null, filters);
        }

        // GET: api/hotels/details/5
        [HttpGet("details/{id}")]
        public async Task<HotelModel> Get(int id)
        {
            var hotel = await _hotelService.GetHotelInfo(id);
            return hotel;
        }

        // GET: api/hotels/locations
        [HttpGet("locations")]
        public async Task<IEnumerable<LocationModel>> GetLocationList()
        {
            var locations = await _hotelService.GetLocationList();
            return locations;
        }

        // PUT: api/hotels/5
        [HttpPut("{id}")]
        [Authorize(Policy = "AdminOnly")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        [Authorize(Policy = "AdminOnly")]
        public IActionResult Delete(int id)
        {
            _hotelService.Delete(id);
            return Ok();
        }
    }
}
