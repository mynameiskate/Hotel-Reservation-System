using DataLayer;
using DataLayer.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Services.Interfaces;
using Services.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Services.Services
{
    public class ImageService : IImageService
    {
        private HotelDbContext _dataContext;
        private readonly string _filePath;
        private readonly string[] _validExtensions;

        public ImageService(HotelDbContext dataContext, IConfiguration configuration)
        {
            _dataContext = dataContext;
            _filePath = configuration["files:filePath"];

             Directory.CreateDirectory(Path.GetDirectoryName(_filePath));
            _validExtensions = configuration
                                  .GetSection("files:validImageExtensions")
                                  .GetChildren()
                                  .Select(x => x.Value)
                                  .ToArray();
        }

        public async Task<List<int>> SaveImages(List<IFormFile> images)
        {
            var newImages = new List<Image>();
            foreach (var image in images)
            {
                string extension = Path.GetExtension(image.FileName).ToLower();

                if (!Array.Exists(_validExtensions, e => e == extension))
                {
                    throw new ArgumentException();
                }

                string fileName = $"{Guid.NewGuid().ToString()}{extension}";

                using (var fileStream = new FileStream(Path.Combine(_filePath, fileName), FileMode.Create))
                {
                    await image.CopyToAsync(fileStream);
                }

                var imageEntity = new Image
                {
                    FileName = fileName
                };

                var entity = await _dataContext.Images.AddAsync(imageEntity);
                newImages.Add(imageEntity);
            }
            await _dataContext.SaveChangesAsync();

            return newImages.Select(img => img.ImageId).ToList();
        }

        public async Task<FileModel> GetImage(int imageId)
        {
            var entityList = _dataContext.Images as IQueryable<RoomImage>;
            var image = _dataContext.Images
                            .First(img => img.ImageId == imageId);


            string fileName = image.FileName;
            var memoryStream = new MemoryStream();
            using (var fileStream = new FileStream(Path.Combine(_filePath, fileName), FileMode.Open))
            {
                await fileStream.CopyToAsync(memoryStream);
            }

            memoryStream.Seek(0, SeekOrigin.Begin);
            string mimeType = MimeMapping.MimeUtility.GetMimeMapping(fileName);
            return new FileModel(memoryStream, mimeType);
        }
    }
}
