using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace DataLayer.Entities
{
    [Table("Users")]
    public class User 
    {
        public int UserId { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string ShortName { get; set; }
        public string FullName { get; set; }   
        public bool IsAdmin { get; set; }
        /*public int RoleId { get; set; }

        public Role Role { get; set; }*/
        public List<RoomReservation> BookingHistory { get; set; }
        public List<Contact> Contacts { get; set; }
    }
}
