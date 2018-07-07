using DataLayer;
using DataLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationSystemApp
{
    public class DataInitializer
    {
        public static void Initialize(DataContext context)
        {
            if (!context.Hotels.Any())
            {
                context.Hotels.AddRange(
                    new Hotel
                    {
                        Name = "The Plaza",
                        Location = new Location
                        {
                            Address = "Fifth Avenue at Central Park South, New York, NY 10019, USA",
                            City = new City
                            {
                                Name = "NYC",
                                Country = new Country
                                {
                                    Name = "USA",
                                    Cities = new List<City>()
                                }
                            }
                        },
                        Stars = 5,
                        Contacts = new List<Contact>()
                    }
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
