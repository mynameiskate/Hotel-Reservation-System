using DataLayer.Entities;
using System;

namespace Services.Models
{
    public class ReservationModel
    {
        public int? RoomReservationId { get; set; }
        public DateTimeOffset Created { get; set; }
        public DateTimeOffset MoveInDate { get; set; }
        public DateTimeOffset MoveOutDate { get; set; }
        public int UserId { get; set; }
        public int HotelRoomId { get; set; }

        public string Status { get; set; }

        public ReservationModel(RoomReservation reservation)
        {
            if (reservation != null)
            {
                RoomReservationId = reservation.RoomReservationId;
                Created = reservation.Created;
                MoveInDate = reservation.MoveInDate;
                MoveOutDate = reservation.MoveOutDate;
                UserId = reservation.UserId;
                HotelRoomId = reservation.HotelRoomId;
            }
        }

        public ReservationModel() {}
    }
}
