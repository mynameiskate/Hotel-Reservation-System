using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer.Entities
{
    [Table("Services")]
    public class Service
    {
        public int ServiceId { get; set; }
        public string Name { get; set; }
    }
}
