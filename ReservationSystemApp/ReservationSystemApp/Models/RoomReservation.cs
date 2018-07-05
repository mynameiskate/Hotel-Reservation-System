using ReservationSystemApp.Models.Hotels;
using ReservationSystemApp.Models.Users;
using System;

namespace ReservationSystemApp.Models
{
    public class RoomReservation
    {
        public RoomReservation(DateTime moveInTime, DateTime moveOutTime, 
                                HotelRoom room, UserInfo bookerInfo, Hotel hotel)
        {
            MoveInTime = moveInTime;
            MoveOutTime = moveOutTime;
            Room = room;
            BookerInfo = bookerInfo;
            Hotel = hotel;
        }

        public DateTime MoveInTime { get; set; }
        public DateTime MoveOutTime { get; set; }
        public HotelRoom Room { get; set; }
        public UserInfo BookerInfo { get; set; }
        public Hotel Hotel { get; set; }
    }
}
