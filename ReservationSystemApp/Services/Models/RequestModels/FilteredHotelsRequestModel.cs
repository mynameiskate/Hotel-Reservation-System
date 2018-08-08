using System;

namespace Services.Models.RequestModels
{
    public class FilteredHotelsRequestModel : PageRequestModel
    {
        public string Name { get; set; }
        public string City { get; set; }
        public string CountryId { get; set; }
        public DateTime? MoveInTime { get; set; }
        public DateTime? MoveOutTime { get; set; }
    }
}
