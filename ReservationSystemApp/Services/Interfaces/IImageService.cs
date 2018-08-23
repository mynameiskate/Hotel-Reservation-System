using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IImageService
    {
        Task<FileResult> DownloadRoomImage(int roomId, int imageId,
            Func<MemoryStream, string, FileResult> resultCallback);
        Task<List<int>> SaveImages(List<IFormFile> images);
    }
}
