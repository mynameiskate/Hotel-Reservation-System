using System.Collections.Generic;

namespace ReservationSystemApp.Models.Hotels
{
    public class Hotel
    {
        public Hotel(string name, Contacts contacts, List<HotelRoom> roomList, 
                     byte stars, List<HotelService> services, List<string> images = null)
        {
            Name = name;
            Contacts = contacts;
            RoomList = roomList;
            Stars = stars;
            Services = services;
            Images = images;
        }

        public string Name { get; set; }
        public Contacts Contacts { get; set; }
        public List<HotelRoom> RoomList { get; set; }
        public byte Stars { get; set; }
        public List<HotelService> Services { get; set; }
        public List<string> Images { get; set; }
    }
}
