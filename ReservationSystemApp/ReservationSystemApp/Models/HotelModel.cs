using DataLayer.Entities;
using System.Collections.Generic;

namespace ReservationSystemApp.Models
{
    public class HotelModel
    {
        public int HotelId { get; set; }
        public string Name { get; set; }
        public byte? Stars { get; set; }
        public LocationModel Location { get; set; }
        public List<ServiceModel> Services { get; set; }
        public List<ContactModel> Contacts { get; set; }
        public List<string> Images { get; set; }
        public List<HotelRoom> Rooms { get; set; }
    }
}
