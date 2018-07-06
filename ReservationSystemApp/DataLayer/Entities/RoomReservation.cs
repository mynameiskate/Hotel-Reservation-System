using System;

namespace DataLayer.Entities
{
    public class RoomReservation
    {
        public int RoomReservationId { get; set; }
        public DateTime ReservationTime { get; set; }
        public DateTime MoveInTime { get; set; }
        public DateTime MoveOutTime { get; set; }
        public HotelRoom Room { get; set; }
        public SiteUser User { get; set; }
        public int UserId { get; set; }
        public Hotel Hotel { get; set; }
        public int HotelId { get; set; }
    }
}
