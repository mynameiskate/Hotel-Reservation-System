using DataLayer.Entities;
using System.Collections.Generic;

namespace ReservationSystemApp.Models
{
    public class HotelRoomModel
    {
        public int Number { get; set; }
        public bool Available { get; set; }
        public float Size { get; set; }
        public float Cost { get; set; }
        public int CanPlace { get; set; }
        public RoomType RoomType { get; set; }
        public List<string> Images { get; set; }
    }
}
