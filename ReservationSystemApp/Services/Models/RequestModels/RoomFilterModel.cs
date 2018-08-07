namespace Services.Models.RequestModels
{
    public class RoomFilterModel : PageRequestModel // TODO: add filters for rooms (cost, type, etc.)
    {
        public int HotelId { get; set; }
    }
}
