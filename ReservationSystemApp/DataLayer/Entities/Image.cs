using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer.Entities
{
    [Table("Images")]
    public class Image
    {
        public int ImageId { get; set; }
        public string FileName { get; set; }

        public int HotelRoomId { get; set; }
        public HotelRoom HotelRoom { get; set; }
        public int HotelId { get; set; }
        public Hotel Hotel { get; set; }
    }
}
