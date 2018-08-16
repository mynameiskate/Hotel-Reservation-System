﻿using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer.Entities
{
    [Table("HotelServices")]
    public class HotelService
    {
        public int HotelServiceId { get; set; }
        public double Cost { get; set; }

        public int HotelId { get; set; }
        public int ServiceId { get; set; }
        public Hotel Hotel { get; set; }
        public Service Service { get; set; }
        public bool IsRemoved { get; set; }
    }
}
