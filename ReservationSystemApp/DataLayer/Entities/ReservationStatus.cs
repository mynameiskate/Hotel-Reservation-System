using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer.Entities
{
    [Table("ReservationStatuses")]
    public class ReservationStatus
    {
        [Column("StatusId")]
        public int ReservationStatusId { get; set; }
        public string Status { get; set; }
    }
}
