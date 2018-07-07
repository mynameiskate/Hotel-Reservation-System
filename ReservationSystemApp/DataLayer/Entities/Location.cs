namespace DataLayer.Entities
{
    public class Location
    {
        public int LocationId { get; set; }
        public string Address { get; set; }

        public int CityId { get; set; }
        public City City { get; set; }
    }
}
