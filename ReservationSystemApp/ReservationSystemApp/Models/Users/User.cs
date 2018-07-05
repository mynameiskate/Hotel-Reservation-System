using System.Collections.Generic;

namespace ReservationSystemApp.Models.Users
{
    public class User
    {
        public User(string login, string password, UserInfo userInfo)
        {
            Login = login;
            Password = password;
            Info = userInfo;
        }

        public string Login { get; set; }
        public string Password { get; set; }
        public UserInfo Info { get; set; }
        public List<RoomReservation> BookingHistory { get; set; }
    }
}
