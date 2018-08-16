using DataLayer.Entities;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Services.Models
{
    public class SignUpModel
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public string ShortName { get; set; }
        public string FullName { get; set; }

        public User ConvertToUser()
        {
            return new User
            {
                ShortName = this.ShortName,
                FullName = this.FullName,
                Email = this.Email
            };
        }
    }
}
