using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace DataLayer.Entities
{
    public class User 
    {
        public int UserId { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ShortName { get; set; }
        public string FullName { get; set; }
        public Role RoleId { get; set; }

        public Role Role { get; set; }
        public List<RoomReservation> BookingHistory { get; set; }
        public List<Contacts> Contacts { get; set; }
    }
}
