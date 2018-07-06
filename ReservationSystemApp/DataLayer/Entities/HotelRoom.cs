using System.Collections.Generic;

namespace DataLayer.Entities
{
    public class HotelRoom
    {
        public int RoomId { get; set; }
        public int Number { get; set; }
        public bool Available { get; set; }
        public RoomType Type { get; set; }
        public float Size { get; set; }
        public float Cost { get; set; }
        public int CanPlace { get; set; }
        public List<string> Images { get; set; }
        public Hotel Hotel { get; set; }
        public int HotelId { get; set; }
    }
}
