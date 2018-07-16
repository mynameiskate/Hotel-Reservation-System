using DataLayer.Entities;
using System;

namespace Services.Models
{
    public class ReservationModel
    {
        public int RoomReservationId { get; set; }
        public DateTimeOffset ReservationTime { get; set; }
        public DateTimeOffset MoveInTime { get; set; }
        public DateTimeOffset MoveOutTime { get; set; }
        public int UserId { get; set; }
        public int HotelRoomId { get; set; }

        public ReservationModel(RoomReservation reservaion)
        {
            if (reservaion != null)
            {
                RoomReservationId = reservaion.RoomReservationId;
                ReservationTime = reservaion.ReservationTime;
                MoveInTime = reservaion.MoveInTime;
                MoveOutTime = reservaion.MoveOutTime;
                UserId = reservaion.UserId;
                HotelRoomId = reservaion.HotelRoomId;
            }
        }

        public ReservationModel() {}
    }
}
