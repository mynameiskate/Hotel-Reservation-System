using DataLayer.Entities;
using System;
using System.Collections.Generic;

namespace Services.Models
{
    public class ReservationModel
    {
        public int? RoomReservationId { get; set; }
        public DateTimeOffset Created { get; set; }
        public DateTime MoveInDate { get; set; }
        public DateTime MoveOutDate { get; set; }
        public int UserId { get; set; }
        public int HotelRoomId { get; set; }
        public TimeSpan MoveInTime { get; set; }
        public string GuestName { get; set; }
        public string Status { get; set; }
        public double TotalCost { get; set; }
        public List<ServiceModel> Services { get; set; }

        public ReservationModel(RoomReservation reservation)
        {
            if (reservation != null)
            {
                MoveInTime = reservation.MoveInTime;
                GuestName = reservation.GuestName;
                TotalCost = reservation.TotalCost;
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
