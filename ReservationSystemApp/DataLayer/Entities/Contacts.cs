namespace DataLayer.Entities
{
    public class Contacts
    {
        public int ContactTypeId { get; set; }
        public string ContactValue { get; set; }

        public ContactType ContactType { get; set; }
    }
}
