using DataLayer.Entities;
using System;

namespace Services.Models
{
    public class ReservationModel
    {
        public int? RoomReservationId { get; set; }
        public DateTimeOffset ReservationTime { get; set; }
        public DateTimeOffset MoveInTime { get; set; }
        public DateTimeOffset MoveOutTime { get; set; }
        public int UserId { get; set; }
        public int HotelRoomId { get; set; }

        public ReservationModel(RoomReservation reservation)
        {
            if (reservation != null)
            {
                RoomReservationId = reservation.RoomReservationId;
                ReservationTime = reservation.Created;
                MoveInTime = reservation.MoveInTime;
                MoveOutTime = reservation.MoveOutTime;
                UserId = reservation.UserId;
                HotelRoomId = reservation.HotelRoomId;
            }
        }

        public ReservationModel() {}
    }
}
