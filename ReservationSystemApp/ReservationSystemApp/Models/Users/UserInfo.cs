namespace ReservationSystemApp.Models.Users
{
    public class UserInfo
    {
        public UserInfo(string name, string surname, string lastName, Contacts contacts)
        {
            Name = name;
            Surname = surname;
            LastName = lastName;
            Contacts = contacts;
        }

        public string Name { get; set; }
        public string Surname { get; set; }
        public string LastName { get; set; }
        public Contacts Contacts { get; set; }
    }
}
