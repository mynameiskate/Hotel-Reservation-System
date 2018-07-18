using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer.Entities
{
    [Table("FilePaths")]
    public class FilePath
    {
        public int FilePathId { get; set; }
        public string Path { get; set; }
    }
}
