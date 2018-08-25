using Microsoft.AspNetCore.Http;
using Services.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IImageService
    {
        Task<FileModel> GetImage(int imageId);
        Task<List<int>> SaveImages(List<IFormFile> images);
    }
}
