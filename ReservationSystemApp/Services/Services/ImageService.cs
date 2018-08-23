﻿using DataLayer;
using DataLayer.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Services.Interfaces;
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

        public ImageService(HotelDbContext dataContext, string filePath, string[] validExtensions)
        {
            _dataContext = dataContext;
            _filePath = filePath;
            _validExtensions = validExtensions;
        }

        public async Task<List<int>> SaveImages(List<IFormFile> images)
        {
            var imageIds = new List<int>();
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
                imageIds.Add(entity.Entity.ImageId);
            }
            await _dataContext.SaveChangesAsync();

            return imageIds;
        }

        public async Task<FileResult> DownloadRoomImage(int roomId, int imageId,
                    Func<MemoryStream, string, FileResult> resultCallback)
        {
            var entityList = _dataContext.RoomImages as IQueryable<RoomImage>;
            var image = _dataContext.RoomImages
                            .Include(img => img.Image)
                            .First(img => img.HotelRoomId == roomId && img.ImageId == imageId);


            string fileName = image.Image.FileName;
            var memoryStream = new MemoryStream();
            using (var fileStream = new FileStream(Path.Combine(_filePath, fileName), FileMode.Open))
            {
                await fileStream.CopyToAsync(memoryStream);
            }

            memoryStream.Seek(0, SeekOrigin.Begin);
            string mimeType = MimeMapping.MimeUtility.GetMimeMapping(fileName);
            return resultCallback(memoryStream, mimeType);
        }
    }
}
