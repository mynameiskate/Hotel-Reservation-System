using System.Collections.Generic;

namespace DataLayer
{
    public class Country
    {
        public string Name { get; set; }

        public List<City> Cities { get; set; }
    }
}
