using DataLayer.Entities;

namespace Services.Models
{
    public class LocationModel
    {
        public string CountryId { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Address { get; set; }

        public LocationModel(Location location)
        {
            var city = location?.City;
            if (city != null)
            {
                City = city.Name;
                Country = city.Country?.Name;
                CountryId = city.Country?.CountryId;
            }
            Address = location.Address;
        }

        public LocationModel() {}
    }
}
