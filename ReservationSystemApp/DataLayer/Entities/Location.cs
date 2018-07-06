namespace DataLayer.Entities
{
    public class Location
    {
        public int LocationId { get; set; }
        public City City { get; set; }
        public Country Country { get; set; }
        public string Address { get; set; }
        public Contacts Contacts { get; set; }
        public int ContactsId { get; set; }
    }
}
