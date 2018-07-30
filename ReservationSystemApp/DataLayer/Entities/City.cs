﻿using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer.Entities
{
    [Table("Cities")]
    public class City
    {
        public int CityId { get; set; }
        public string Name { get; set; }
        public string CountryId { get; set; }
        public Country Country { get; set; }
    }
}
