using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer.Entities
{
    [Table("RoomReservations")]
    public class RoomReservation
    {
        public int RoomReservationId { get; set; }
        public DateTimeOffset Created { get; set; }
        public double TotalCost { get; set; }
        public TimeSpan? MoveInTime { get; set;}
        public string GuestName { get; set; }
        public DateTime MoveInDate { get; set; }
        public DateTime MoveOutDate { get; set; }
        public int StatusId { get; set; }
        public int UserId { get; set; }
        public int HotelRoomId { get; set; }
        public User User { get; set; }
        public HotelRoom HotelRoom { get; set; }
    }
}
