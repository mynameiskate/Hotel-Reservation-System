using System;

namespace DataLayer.Entities
{
    public class RoomReservation
    {
        public int RoomReservationId { get; set; }
        public DateTimeOffset ReservationTime { get; set; }
        public DateTimeOffset MoveInTime { get; set; }
        public DateTimeOffset MoveOutTime { get; set; }
       
        public int UserId { get; set; }
        public int HotelId { get; set; }
        public User User { get; set; }
        public Hotel Hotel { get; set; }
        public HotelRoom Room { get; set; }
    }
}
