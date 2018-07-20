using System.Collections.Generic;

namespace Services.Models
{
    public class UserModel
    {
        public int UserId { get; set; }
        public string Email { get; set; }
        public string ShortName { get; set; }
        public string FullName { get; set; }
        public bool IsAdmin { get; set; }
        /*public List<ReservationModel> BookingHistory { get; set; }
        public List<ContactModel> Contacts { get; set; }*/
    }
}