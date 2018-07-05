using System.Collections.Generic;

namespace DataLayer
{
    public class User
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public UserInfo Info { get; set; }
        public List<RoomReservation> BookingHistory { get; set; }
    }
}
