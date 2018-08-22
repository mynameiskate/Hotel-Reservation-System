using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Services.Interfaces;

namespace ReservationSystemApp.Controllers
{
    [Route("api/images")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly ILogger<HotelController> _logger;
        private readonly IImageService _imageService;

        public ImageController(ILogger<HotelController> logger,
                               IImageService imageService)
        {
            _logger = logger;
            _imageService = imageService;
        }

        [HttpPost("rooms/{roomId}")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> SaveRoomImages(int roomId, [FromForm]List<IFormFile> images)
        {
            try
            {
                await _imageService.SaveRoomImages(roomId, images);
                return Ok();
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