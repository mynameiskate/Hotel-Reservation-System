using System;
using System.Runtime.Serialization;

namespace Services.Models
{
    [DataContract]
    public class FilterModel
    {
        public string Name { get; set; }
        public string City { get; set; }
        public string CountryId { get; set; }
        public DateTime? MoveInTime { get; set; }
        public DateTime? MoveOutTime { get; set; }
    }
}
