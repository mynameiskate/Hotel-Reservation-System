using System;

namespace Services.Models.RequestModels
{
    public class FilteredHotelsRequestModel : PageRequestModel
    {
        public int? HotelId { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string CountryId { get; set; }
        public DateTime? MoveInDate { get; set; }
        public DateTime? MoveOutDate { get; set; }
        public int Adults { get; set; }
    }
}
