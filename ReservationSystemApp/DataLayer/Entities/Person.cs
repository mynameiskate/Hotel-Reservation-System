namespace DataLayer.Entities
{
    public class Person
    {
        public int PersonId { get; set; }
        public string ShortName { get; set; }
        public string FullName { get; set; }

        public Contacts Contacts { get; set; }
    }
}
