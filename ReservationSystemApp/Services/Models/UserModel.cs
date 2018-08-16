using DataLayer.Entities;
using System.ComponentModel.DataAnnotations;

namespace Services.Models
{
    public class UserModel
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        public string Email { get; set; }
        public string ShortName { get; set; }
        public string FullName { get; set; }
        public bool IsAdmin { get; set; }
        /*public List<ReservationModel> BookingHistory { get; set; }
        public List<ContactModel> Contacts { get; set; }*/

        public UserModel(User user)
        {
            UserId = user.UserId;
            Email = user.Email;
            ShortName = user.ShortName;
            FullName = user.FullName;
            IsAdmin = user.IsAdmin;
        }

        public User ConvertToUser()
        {
            return new User
            {
                UserId = this.UserId,
                ShortName = this.ShortName,
                FullName = this.FullName,
                IsAdmin = this.IsAdmin,
                Email = this.Email
            };
        }
    }
}