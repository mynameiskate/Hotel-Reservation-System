using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer.Entities
{
    [Table("HotelImages")]
    public class HotelImage
    {
        public int HotelImageId { get; set; }

        public int ImageId { get; set; }
        public Image Image { get; set; }
        public int HotelId { get; set; }
        public Hotel Hotel { get; set; }
    }
}
