using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Services.Exceptions;
using Services.Interfaces;
using Services.Models;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ReservationSystemApp.Controllers
{
    [Route("api/booking")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly ILogger<HotelController> _logger;
        private readonly IReservationService _reservationService;
        private readonly IAccountService _accountService;

        public ReservationController(ILogger<HotelController> logger,
                          IReservationService reservationService,
                          IAccountService accountService)
        {
            _logger = logger;
            _reservationService = reservationService;
            _accountService = accountService;
        }

        [HttpPut("{reservationId}")]
        [Authorize]
        public async Task<IActionResult> UpdateReservation([FromBody]ReservationModel reservation)
        {
            try
            {
                await _reservationService.UpdateReservation(reservation);
                return Ok();
            }
            catch (BookingException)
            {
                return BadRequest(StatusCodes.Status403Forbidden);
            }
            catch (UserNotFoundException)
            {
                return StatusCode(StatusCodes.Status403Forbidden);
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

        [HttpPost("{roomId}")]
        [Authorize]
        public async Task<IActionResult> Book([FromBody]ReservationModel reservation)
        {
            try
            {
                string email = HttpContext.User.FindFirst(ClaimTypes.Email).Value;

                if (email != null)
                {
                    var reservationModel = await _reservationService.Book(email, reservation);
                    return Ok(reservationModel);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (BookingException)
            {
                return BadRequest(StatusCodes.Status403Forbidden);
            }
            catch (UserNotFoundException)
            {
                return StatusCode(StatusCodes.Status403Forbidden);
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
    }
}
