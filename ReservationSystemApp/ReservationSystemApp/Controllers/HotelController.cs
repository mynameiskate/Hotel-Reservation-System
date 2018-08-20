﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Services.Exceptions;
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
        private readonly ILocationService _locationService;

        public HotelController(ILogger<HotelController> logger,
                               IHotelService hotelService,
                               ILocationService locationService)
        {
            _logger = logger;
            _hotelService = hotelService;
            _locationService = locationService;
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

        //Get existing services in current hotel
        [HttpGet("{id}/services")]
        public async Task<List<ServiceModel>> GetServiceList(int id)
        {
            return await _hotelService.GetAvailableServices(id);
        }

        //Get all possible services that can be created for any hotel
        [HttpGet("services")]
        public async Task<List<ServiceModel>> GetServiceList()
        {
            return await _hotelService.GetPossibleServices();
        }

        // GET: api/hotels/details/5
        [HttpGet("{id}/details")]
        public async Task<HotelModel> Get(int id)
        {
            var hotel = await _hotelService.GetHotelInfo(id);
            return hotel;
        }

        [HttpPost("{id}/services")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> CreateHotelService(int id, [FromBody]ServiceModel serviceModel)
        {
            try
            {
                await _hotelService.CreateHotelService(id, serviceModel);
                return Ok();
            }
            catch (LocationNotFoundException)
            {
                return BadRequest();
            }
            catch (ArgumentException)
            {
                return BadRequest();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> Put([FromBody]HotelModel hotelModel)
        {
            try
            {
                await _hotelService.UpdateHotelInfo(hotelModel);          
                return Ok();
            }
            catch (LocationNotFoundException)
            {
                return BadRequest();
            }
            catch (ArgumentException)
            {
                return BadRequest();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "AdminOnly")]
        public IActionResult Delete(int id)
        {
            _hotelService.Delete(id);
            return Ok();
        }
    }
}
