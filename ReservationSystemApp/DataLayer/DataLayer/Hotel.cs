using System.Collections.Generic;

namespace DataLayer
{
    public class Hotel
    {
        public string Name { get; set; }
        public Contacts Contacts { get; set; }
        public List<HotelRoom> RoomList { get; set; }
        public byte Stars { get; set; }
        public List<HotelService> Services { get; set; }
        public List<string> Images { get; set; }
    }
}
