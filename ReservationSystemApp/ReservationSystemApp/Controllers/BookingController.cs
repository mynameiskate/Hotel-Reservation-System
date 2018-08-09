using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ReservationSystemApp.Controllers
{
    [Route("api/booking")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly ILogger<HotelController> _logger;
        private readonly IHotelService _hotelService;
        private readonly IAccountService _accountService;

        public BookingController(ILogger<HotelController> logger,
                          IHotelService hotelService,
                          IAccountService accountService)
        {
            _logger = logger;
            _hotelService = hotelService;
            _accountService = accountService;
        }

        [HttpGet("{roomId}")]
        [Authorize]
        public async Task<IActionResult> BookAsync(int roomId)
        {
            try
            {
                string email = HttpContext.User.FindFirst(ClaimTypes.Email).Value;

                if (email != null)
                {
                    var reservationModel = await _hotelService.Book(roomId, email);
                    return Ok(reservationModel);
                }
                else
                {
                    return BadRequest();
                }
                
            }
            catch(Exception e)
            {
                _logger.LogInformation(e.Message);
                return BadRequest();
            }
        }

    }
}
