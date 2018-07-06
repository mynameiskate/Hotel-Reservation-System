namespace DataLayer.Entities
{
    public class Contacts
    {
        public int ContactsId { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public Location Location { get; set; }

        public Person Person { get; set; }
        public int PersonId { get; set; }
    }
}
