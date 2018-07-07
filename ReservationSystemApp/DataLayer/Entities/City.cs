using System.Collections.Generic;

namespace DataLayer.Entities
{
    public class City
    {
        public string Name { get; set; }
        public List<Location> Locations { get; set; }

        public int CityId { get; set; }
        public int CountryId { get; set; }
        public Country Country { get; set; }
    }
}
