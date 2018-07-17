using System.Collections.Generic;

namespace DataLayer.Entities
{
    public class HotelRoom
    {
        public int HotelRoomId { get; set; }
        public int Number { get; set; }
        public bool IsAvailable { get; set; }
        public float Size { get; set; }
        public float Cost { get; set; }
        public int CanPlace { get; set; }
        public RoomType RoomType { get; set; }

        public int HotelId { get; set; }
        public Hotel Hotel { get; set; }
        public List<FilePath> Images { get; set; }
    }
}
