using DataLayer.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Services.Models
{
    public class HotelModel 
    {
        public int HotelId { get; set; }
        [Required]
        public string Name { get; set; }
        [Range(0, 5)]
        public byte Stars { get; set; }
        [Required]
        public LocationModel Location { get; set; }
        public List<ServiceModel> Services { get; set; }
        public List<ContactModel> Contacts { get; set; }
        public List<HotelRoomModel> Rooms { get; set; }
        public bool IsRemoved { get; set; }

        public HotelModel(Hotel hotel)
        {
            if (hotel != null)
            {
                HotelId = hotel.HotelId;
                Name = hotel.Name;
                Stars = hotel.Stars;
                IsRemoved = hotel.IsRemoved;
                Location = new LocationModel(hotel.Location);

                IEnumerable<ServiceModel> services = hotel.Services?.Select(s => new ServiceModel(s));
                Services = services?.ToList() ?? new List<ServiceModel>();

                IEnumerable<ContactModel> contacts = hotel.Contacts?.Select(c => new ContactModel(c));
                Contacts = contacts?.ToList() ?? new List<ContactModel>();

                IEnumerable<HotelRoomModel> rooms = hotel.Rooms?.Select(r => new HotelRoomModel(r));
                Rooms = rooms?.ToList() ?? new List<HotelRoomModel>();
            }
        }

        public HotelModel() {}
    }
}
