using System.IO;

namespace Services.Models
{
    public class FileModel
    {
        public MemoryStream MemoryStream { get; set; }
        public string ContentType { get; set; }

        public FileModel(MemoryStream stream, string contentType)
        {
            MemoryStream = stream;
            ContentType = contentType;
        }
    }
}
