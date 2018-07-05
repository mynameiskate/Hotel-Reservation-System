using System.Collections.Generic;

namespace DataLayer
{
    public class HotelRoom
    {
        public int Number { get; set; }
        public bool Available { get; set; }
        public RoomType Type { get; set; }
        public float Size { get; set; }
        public float Cost { get; set; }
        public int CanPlace { get; set; }
        public List<string> Images { get; set; }
    }
}
