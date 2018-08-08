using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer.Entities
{
    [Table("RoomReservations")]
    public class RoomReservation
    {
        public int RoomReservationId { get; set; }
        public DateTimeOffset Created { get; set; }
        public DateTimeOffset MoveInDate { get; set; }
        public DateTimeOffset MoveOutDate { get; set; }
        public ReservationStatus Status { get; set; }
        public int UserId { get; set; }
        public int HotelRoomId { get; set; }
        public User User { get; set; }
        public HotelRoom HotelRoom { get; set; }
    }
}
