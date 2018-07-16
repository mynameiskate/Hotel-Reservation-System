using System;

namespace ReservationSystemApp.Models
{
    public class ReservationModel
    {
        public int RoomReservationId { get; set; }
        public DateTimeOffset ReservationTime { get; set; }
        public DateTimeOffset MoveInTime { get; set; }
        public DateTimeOffset MoveOutTime { get; set; }
        public int UserId { get; set; }
        public int HotelRoomId { get; set; }
    }
}
