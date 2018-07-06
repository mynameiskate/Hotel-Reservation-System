using System.Collections.Generic;

namespace DataLayer.Entities
{
    public class SiteUser : Person
    {
        public int UserId { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public List<RoomReservation> BookingHistory { get; set; }
    }
}
