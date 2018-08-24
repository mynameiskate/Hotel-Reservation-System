using System;
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
        public async Task<IActionResult> GetHotelList([FromQuery]FilteredHotelsRequestModel requestModel)
        {
            try
            {
                var page = await _hotelService.GetHotelPage(requestModel);
                return Ok(page);
            }
            catch(Exception e)
            {
                _logger.LogInformation(e.Message, e.StackTrace);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("{id}/rooms")]
        public async Task<IActionResult> GetRoomList(int id, [FromQuery]FilteredRoomsRequestModel requestModel)
        {
            try
            {
                var rooms = await _hotelService.GetHotelRooms(id, requestModel);
                return Ok(rooms);
            }
            catch (Exception e)
            {
                _logger.LogInformation(e.Message, e.StackTrace);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        //Get existing services in current hotel
        [HttpGet("{id}/services")]
        public async Task<IActionResult> GetServiceList(int id)
        {
            try
            {
                var services = await _hotelService.GetAvailableServices(id);
                return Ok(services);
            }
            catch (Exception e)
            {
                _logger.LogInformation(e.Message, e.StackTrace);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        //Get all possible services that can be created for any hotel
        [HttpGet("services")]
        public async Task<IActionResult> GetServiceList()
        {
            try
            {
                var services = await _hotelService.GetPossibleServices();
                return Ok(services);
            }
            catch (Exception e)
            {
                _logger.LogInformation(e.Message, e.StackTrace);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        // GET: api/hotels/details/5
        [HttpGet("{id}/details")]
        public async Task<IActionResult> GetHotelInfo(int id)
        {
            try
            {
                var hotelInfo = await _hotelService.GetHotelInfo(id);
                return Ok(hotelInfo);
            }
            catch (Exception e)
            {
                _logger.LogInformation(e.Message, e.StackTrace);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
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
            catch (LocationNotFoundException e)
            {
                _logger.LogInformation(e.Message, e.StackTrace);
                return BadRequest();
            }
            catch (ArgumentException e)
            {
                _logger.LogInformation(e.Message, e.StackTrace);
                return BadRequest();
            }
            catch(Exception e)
            {
                _logger.LogInformation(e.Message, e.StackTrace);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost("{id}/rooms")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> AddHotelRoom(int id, [FromBody]HotelRoomModel roomModel)
        {
            try
            {
                HotelRoomModel hotelRoom = await _hotelService.AddHotelRoom(id, roomModel);
                return Ok(hotelRoom);
            }
            catch (ArgumentException e)
            {
                _logger.LogInformation(e.Message, e.StackTrace);
                return BadRequest();
            }
            catch(Exception e)
            {
                _logger.LogInformation(e.Message, e.StackTrace);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> AddHotel([FromBody]HotelModel hotelModel)
        {
            try
            {
                HotelModel hotel = await _hotelService.AddHotel(hotelModel);
                return Ok(hotel);
            }
            catch (ArgumentException e)
            {
                _logger.LogInformation(e.Message, e.StackTrace);
                return BadRequest();
            }
            catch(Exception e)
            {
                _logger.LogInformation(e.Message, e.StackTrace);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> UpdateHotelInfo([FromBody]HotelModel hotelModel)
        {
            try
            {
                await _hotelService.UpdateHotelInfo(hotelModel);          
                return Ok();
            }
            catch (LocationNotFoundException e)
            {
                _logger.LogInformation(e.Message, e.StackTrace);
                return BadRequest();
            }
            catch (ArgumentException e)
            {
                _logger.LogInformation(e.Message, e.StackTrace);
                return BadRequest();
            }
            catch(Exception e)
            {
                _logger.LogInformation(e.Message, e.StackTrace);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("{hotelId}/rooms/{roomId}")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> UpdateHotelRoomInfo(int hotelId, [FromBody]HotelRoomModel roomModel)
        {
            try
            {
                await _hotelService.UpdateHotelRoomInfo(hotelId, roomModel);
                return Ok();
            }
            catch (ArgumentException e)
            {
                _logger.LogInformation(e.Message, e.StackTrace);
                return BadRequest();
            }
            catch(Exception e)
            {
                _logger.LogInformation(e.Message, e.StackTrace);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "AdminOnly")]
        public IActionResult DeleteHotel(int id)
        {
            try
            {
                _hotelService.Delete(id);
                return Ok();
            }
            catch (Exception e)
            {
                _logger.LogInformation(e.Message, e.StackTrace);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
