using DataLayer.Entities;
using System.Collections.Generic;

namespace Services.Models
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
        public List<HotelRoomModel> Rooms { get; set; }

        public HotelModel(Hotel hotel)
        {
            if (hotel != null)
            {
                HotelId = hotel.HotelId;
                Name = hotel.Name;
                Stars = hotel.Stars;
                Location = new LocationModel(hotel.Location);

                Services = new List<ServiceModel>();
                if (hotel.Services != null)
                {
                    foreach (var service in hotel.Services)
                    {
                        Services.Add(new ServiceModel(service));
                    }
                }

                Contacts = new List<ContactModel>();
                if (hotel.Contacts != null)
                {
                    foreach (var contact in hotel.Contacts)
                    {
                        Contacts.Add(new ContactModel(contact));
                    }
                }

                Rooms = new List<HotelRoomModel>();
                if (hotel.Rooms != null)
                {
                    foreach (var room in hotel.Rooms)
                    {
                        Rooms.Add(new HotelRoomModel(room));
                    }
                }
            }
        }

        public HotelModel() {}
    }
}
