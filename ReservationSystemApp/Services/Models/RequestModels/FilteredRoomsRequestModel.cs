using System;

namespace Services.Models.RequestModels
{
    public class FilteredRoomsRequestModel : PageRequestModel 
    {   
        public int? RoomId { get; set; }
        public int MinCost { get; set; }
        public int MaxCost { get; set; }
        public string RoomType { get; set; }
        public int Adults{ get; set; }
        public DateTime? MoveInDate { get; set; }
        public DateTime? MoveOutDate { get; set; }
    }
}
