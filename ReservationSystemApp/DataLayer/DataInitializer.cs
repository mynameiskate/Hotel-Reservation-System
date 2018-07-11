using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace DatabaseRepositories
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
                                    Name = "USA"
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
