using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer.Entities
{
    [Table("RoomTypes")]
    public class RoomType
    {
        [Column("RoomType")]
        public string RoomTypeName { get; set; }
        public int RoomTypeId { get; set; }
    }
}
