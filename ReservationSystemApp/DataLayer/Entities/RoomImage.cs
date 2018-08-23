using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer.Entities
{
    [Table("RoomImages")]
    public class RoomImage
    {
        public int RoomImageId { get; set; }

        public int ImageId { get; set; }
        public Image Image { get; set; }
        public int HotelRoomId { get; set; }
        public HotelRoom HotelRoom { get; set; }
    }
}
