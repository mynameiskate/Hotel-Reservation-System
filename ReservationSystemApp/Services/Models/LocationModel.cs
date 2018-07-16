using DataLayer.Entities;

namespace Services.Models
{
    public class LocationModel
    {
        public string Country { get; set; }
        public string City { get; set; }
        public string Address { get; set; }

        public LocationModel(Location location)
        {
            if (location != null)
            {
                City city = location.City;
                if (city != null)
                {
                    City = city.Name;
                    Country country = city.Country;
                    if (country != null)
                    {
                        Country = country.Name;
                    }
                }
                Address = location.Address;
            }
        }

        public LocationModel() {}
    }
}
