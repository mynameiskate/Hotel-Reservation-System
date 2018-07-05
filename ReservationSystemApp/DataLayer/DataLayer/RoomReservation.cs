using System;

namespace DataLayer
{
    public class RoomReservation
    {
        public DateTime MoveInTime { get; set; }
        public DateTime MoveOutTime { get; set; }
        public HotelRoom Room { get; set; }
        public UserInfo BookerInfo { get; set; }
        public Hotel Hotel { get; set; }
    }
}
