using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer.Entities
{
    [Table("Countries")]
    public class Country
    {
        public string CountryId { get; set; }
        public string Name { get; set; }

        //public List<City> Cities { get; set; }
    }
}
