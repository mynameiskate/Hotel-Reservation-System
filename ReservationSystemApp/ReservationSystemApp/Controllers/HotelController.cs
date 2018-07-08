﻿using System.Collections.Generic;
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
        private HotelRepository _hotelRepository;

        public HotelController(HotelRepository hotelRepository)
        {
            _hotelRepository = hotelRepository;
        }

        [Route("all")]
        [HttpGet]
        public async Task<List<Hotel>> GetHotelList()
        {
            return await _hotelRepository.GetHotelList();
        }

        // GET: api/Hotel
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Hotel/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Hotel
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Hotel/5
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
