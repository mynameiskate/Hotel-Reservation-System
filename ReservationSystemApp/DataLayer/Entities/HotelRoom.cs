using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;


namespace DataLayer.Entities
{
    [Table("HotelRooms")]
    public class HotelRoom
    {
        public int HotelRoomId { get; set; }
        public int Number { get; set; }
        public bool IsAvailable { get; set; }
        public double Size { get; set; }
        public double Cost { get; set; }
        public int Adults { get; set; }

        public RoomType RoomType { get; set; }
        public int RoomTypeId { get; set; }
        public int HotelId { get; set; }
        public Hotel Hotel { get; set; }
        public List<FilePath> Images { get; set; }
    }
}
