using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer.Entities
{
    [Table("HotelServices")]
    public class HotelService
    {
        public int HotelServiceId { get; set; }
        public string Name { get; set; }
        public float Cost { get; set; }

        public int HotelId { get; set; }
        public Hotel Hotel { get; set; }
    }
}
