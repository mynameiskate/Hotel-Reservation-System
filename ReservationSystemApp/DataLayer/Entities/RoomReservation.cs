using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer.Entities
{
    [Table("RoomReservations")]
    public class RoomReservation
    {
        public int RoomReservationId { get; set; }
        public DateTimeOffset ReservationTime { get; set; }
        public DateTimeOffset MoveInTime { get; set; }
        public DateTimeOffset MoveOutTime { get; set; }
       
        public int UserId { get; set; }
        public int HotelRoomId { get; set; }
        public User User { get; set; }
        public HotelRoom HotelRoom { get; set; }
    }
}
