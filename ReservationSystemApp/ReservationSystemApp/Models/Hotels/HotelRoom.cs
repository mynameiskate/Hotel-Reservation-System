using System.Collections.Generic;

namespace ReservationSystemApp.Models.Hotels
{
    public class HotelRoom
    {
        public HotelRoom(int number, RoomType type, float size, float cost, int canPlace, 
                         bool available = true, List<string> images = null)
        {
            Number = number;
            Type = type;
            Size = size;
            Cost = cost;
            CanPlace = canPlace;
            Available = available;
            Images = images;
        }

        public int Number { get; set; }
        public bool Available { get; set; }
        public RoomType Type { get; set; }
        public float Size { get; set; }
        public float Cost { get; set; }
        public int CanPlace { get; set; }
        public List<string> Images { get; set; }
    }
}
