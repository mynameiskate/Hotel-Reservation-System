using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IImageService
    {
        Task SaveRoomImages(int roomId, IFormFileCollection images);
    }
}
