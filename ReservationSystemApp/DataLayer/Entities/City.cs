namespace DataLayer.Entities
{
    public class City
    {
        public string Name { get; set; }
        public int CityId { get; set; }
        public int CountryId { get; set; }
        public Country Country { get; set; }
    }
}
