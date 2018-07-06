using System.Collections.Generic;

namespace DataLayer.Entities
{
    public class Hotel
    {
        public int HotelId { get; set; }
        public string Name { get; set; }
        public int LocationId { get; set; }
        public byte? Stars { get; set; }

        public List<HotelService> Services { get; set; }
        public List<Contacts> Contacts { get; set; }
        public Location Location { get; set; }
        public List<string> Images { get; set; }
        public List<HotelRoom> RoomList { get; set; }
    }
}
