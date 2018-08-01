using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Services.Interfaces;
using Services.Models;

namespace ReservationSystemApp.Controllers
{
    [Route("api/hotels")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        private readonly ILogger<HotelController> _logger;
        private readonly IHotelService _hotelService;
        private readonly IHotelPageService _pageService;

        public HotelController(ILogger<HotelController> logger,
                               IHotelService hotelService, 
                               IHotelPageService pageService)
        {
            _logger = logger;
            _hotelService = hotelService;
            _pageService = pageService;
        }

        // GET: api/hotels/?
        [HttpGet]
        public async Task<PageModel> GetHotelList([FromQuery]PageRequestModel requestModel)
        {
            return await _pageService.GetHotelPage(requestModel);
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
