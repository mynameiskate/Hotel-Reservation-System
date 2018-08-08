using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Services.Interfaces;
using Services.Models;
using Services.Models.PageModels;
using Services.Models.RequestModels;

namespace ReservationSystemApp.Controllers
{
    [Route("api/hotels")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        private readonly ILogger<HotelController> _logger;
        private readonly IHotelService _hotelService;

        public HotelController(ILogger<HotelController> logger,
                               IHotelService hotelService)
        {
            _logger = logger;
            _hotelService = hotelService;
        }

        // GET: api/hotels/?
        [HttpGet]
        public async Task<PageModel<HotelModel>> GetHotelList([FromQuery]FilteredHotelsRequestModel requestModel)
        {
            return await _hotelService.GetHotelPage(requestModel);
        }

        [HttpGet("{id}/rooms")]
        public async Task<PageModel<HotelRoomModel>> GetRoomList(int id, [FromQuery]FilteredRoomsRequestModel requestModel)
        {
            return await _hotelService.GetHotelRooms(id, requestModel);
        }

        // GET: api/hotels/details/5
        [HttpGet("details/{id}")]
        public async Task<HotelModel> Get(int id)
        {
            var hotel = await _hotelService.GetHotelInfo(id);
            return hotel;
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
