using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer.Entities
{
    [Table("ReservationServices")]
    public class ReservationService
    {
        public int ReservationServiceId { get; set; }
        public int HotelServiceId { get; set; }
        public int ReservationId { get; set; }
        public HotelService HotelService { get; set; }
        public RoomReservation RoomReservation;

    }
}