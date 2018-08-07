using System.Collections.Generic;

namespace Services.Models.PageModels
{
    public class RoomPageModel : PageModel
    {
        public IEnumerable<HotelRoomModel> Rooms { get; set; }
        public int TotalRoomAmount { get; set; }

        public RoomPageModel(int number, int size, int amount,
           IEnumerable<HotelRoomModel> rooms) : base(number, size)
        {
            Rooms = rooms;
            TotalRoomAmount = amount;
        }
    }
}
