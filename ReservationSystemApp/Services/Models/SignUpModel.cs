using DataLayer.Entities;
using Newtonsoft.Json;

namespace Services.Models
{
    public class SignUpModel
    {
        public string Email { get; set; }
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
