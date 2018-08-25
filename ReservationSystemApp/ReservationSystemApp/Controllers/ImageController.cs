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

        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> SaveImages([FromForm(Name = "images")]List<IFormFile> images)
        {
            try
            {
                var imageIds = await _imageService.SaveImages(images);
                return Ok(imageIds);
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

        [HttpGet("{imageId}")]
        public async Task<IActionResult> GetRoomImage(int imageId)
        {
            try
            {
                var fileModel = await _imageService.GetImage(imageId);
                return File(fileModel.MemoryStream, fileModel.ContentType);
            }
            catch (ArgumentException e)
            {
                _logger.LogInformation(e.Message, e.StackTrace);
                return BadRequest();
            }
            catch (Exception e)
            {
                _logger.LogInformation(e.Message, e.StackTrace);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}