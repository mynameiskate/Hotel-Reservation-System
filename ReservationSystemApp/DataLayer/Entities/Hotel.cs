using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer.Entities
{
    [Table("Hotels")]
    public class Hotel
    {
        public int HotelId { get; set; }
        public string Name { get; set; }
        public byte? Stars { get; set; }

        public int LocationId { get; set; }
        public Location Location { get; set; }
        public List<HotelService> Services { get; set; }
        public List<Contact> Contacts { get; set; }
        public List<FilePath> Images { get; set; }
        public List<HotelRoom> Rooms { get; set; }
        public bool IsRemoved { get; set; }
    }
}
