using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;


namespace DataLayer.Entities
{
    [Table("Roles")]
    public class Role
    {
        public int RoleId { get; set; }
        public string Name { get; set; }

        public List<User> Users { get; set; }
    }
}
