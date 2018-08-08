namespace Services.Models.RequestModels
{
    public class FilteredRoomsRequestModel : PageRequestModel 
    {
        public int MinCost { get; set; }
        public int MaxCost { get; set; }
        public string RoomType { get; set; }
        public int CanPlace { get; set; }
    }
}
