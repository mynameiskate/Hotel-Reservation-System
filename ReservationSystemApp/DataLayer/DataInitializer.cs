using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace DataLayer
{
    public class DataInitializer
    {
        public static void Initialize(DataContext context)
        {
            if (!context.Hotels.Any())
            {
                var city = new City
                {
                    Name = "NYC",
                    Country = new Country
                    {
                        Name = "USA"
                    }
                };
                var hotel = new Hotel();
                hotel.Contacts = new List<Contact>();
                var contact = new Contact
                {
                    ContactValue = "(212) 800-3000",
                    ContactType = ContactType.Phone
                };
                hotel.Contacts.Add(contact);
                hotel.Name = "Another hotel";
                hotel.Location = new Location();
                hotel.Location.Address = "Fifth Avenue at Central Park South, New York, NY 10019, USA";
                hotel.Location.City = city;
                hotel.IsRemoved = false;

                context.Hotels.AddRange(
                    new Hotel
                    {
                        Name = "The Plaza",
                        Location = new Location
                        {
                            Address = "Fifth Avenue at Central Park South, New York, NY 10019, USA",
                            City = city
                        },
                        Stars = 5,
                        Contacts = new List<Contact>(),
                        IsRemoved = false
                    },
                    hotel
                        /*Add(new Contact
                        {
                            ContactValue = "(212) 759-3000",
                            ContactType = ContactType.Phone
                        }),*/
                );
                context.SaveChanges();
            }
        }
    }
}
