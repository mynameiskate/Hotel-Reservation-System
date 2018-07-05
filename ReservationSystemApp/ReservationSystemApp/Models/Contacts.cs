namespace ReservationSystemApp.Models
{
    public class Contacts
    {
        public Contacts(string phoneNumber, string email, string address, string country, string city)
        {
            PhoneNumber = phoneNumber;
            Email = email;
            Address = address;
            Country = country;
            City = city;
        }

        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
    }
}
