using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer.Entities
{
    [Table("Images")]
    public class Image
    {
        public int ImageId { get; set; }
        public string FileName { get; set; }
    }
}
