using DataLayer.Entities;

namespace Services.Models
{
    public class LocationModel
    {
        public int LocationId { get; set; }
        public string CountryId { get; set; }
        public string Country { get; set; }
        public int CityId { get; set; }
        public string City { get; set; }
        public string Address { get; set; }

        public LocationModel(Location location)
        {
            var city = location?.City;
            if (city != null)
            {
                City = city.Name;
                CityId = city.CityId;
                Country = city.Country?.Name;
                CountryId = city.Country?.CountryId;
                LocationId = location.LocationId;
            }
            Address = location?.Address;
        }

        public LocationModel() {}
    }
}
