using System.Collections.Generic;
using System.Threading.Tasks;
using DataLayer.Entities;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace ReservationSystemApp.Controllers
{
    [Route("api/hotels")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        private IHotelService _hotelService;

        public HotelController(IHotelService hotelService)
        {
            _hotelService = hotelService;
        }

        // GET: api/hotels/all
        [Route("all")]
        [HttpGet]
        public async Task<IEnumerable<Hotel>> GetHotelList()
        {          
            return await _hotelService.GetHotelList();
        }

        // GET: api/hotels
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/hotels/5
        [HttpGet("{id}", Name = "Get")]
        public async Task<Hotel> Get(int id)
        {
            return await _hotelService.GetHotelInfo(id);
        }

        // POST: api/hotels
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/hotels/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _hotelService.Delete(id);
            return Ok();
        }
    }
}
