using System.Collections.Generic;
using System.Threading.Tasks;
using DatabaseRepositories.Repositories;
using DataLayer.Entities;
using Microsoft.AspNetCore.Mvc;

namespace ReservationSystemApp.Controllers
{
    [Route("api/hotels")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        private DatabaseRepositories.Repositories.HotelService _hotelRepository;

        public HotelController(DatabaseRepositories.Repositories.HotelService hotelRepository)
        {
            _hotelRepository = hotelRepository;
        }

        // GET: api/hotels/all
        [Route("all")]
        [HttpGet]
        public async Task<List<Hotel>> GetHotelList()
        {
            return await _hotelRepository.GetHotelList();
        }

        // GET: api/hotels
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/hotels/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
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
        public void Delete(int id)
        {
        }
    }
}
