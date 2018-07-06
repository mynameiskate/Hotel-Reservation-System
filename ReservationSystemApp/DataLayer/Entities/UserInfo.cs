namespace DataLayer.Entities
{
    public class UserInfo 
    { 
        public int UserInfoId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string LastName { get; set; }
        public Contacts Contacts { get; set; }
        public SiteUser User { get; set; }
        public int UserId { get; set; }
    }
}
