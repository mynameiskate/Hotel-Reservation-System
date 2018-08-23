using DataLayer;
using DataLayer.Entities;
using Microsoft.AspNetCore.Http;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Services.Services
{
    public class ImageService : IImageService
    {
        private HotelDbContext _dataContext;
        private readonly string _filePath;

        public ImageService(HotelDbContext dataContext, string filePath)
        {
            _dataContext = dataContext;
            _filePath = filePath;
        }

        public async Task SaveRoomImages(int roomId, IFormFileCollection images)
        {
            foreach (var image in images)
            {
                var fileName = Guid.NewGuid().ToString();
      
                using (var fileStream = new FileStream(Path.Combine(_filePath, fileName), FileMode.Create))
                {
                    await image.CopyToAsync(fileStream);
                }

                var imageEntity = new Image
                {
                    FileName = fileName,
                    HotelRoomId = roomId
                };

                await _dataContext.Images.AddAsync(imageEntity);
            }
            await _dataContext.SaveChangesAsync();
        }
    }
}
