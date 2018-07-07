namespace DataLayer.Entities
{
    public class Contact
    {
        public int ContactId { get; set; }
        public string ContactValue { get; set; }

        public ContactType ContactType { get; set; }
    }
}
