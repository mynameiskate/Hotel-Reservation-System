using System.Collections.Generic;

namespace Services.Models.PageModels
{
    public class HotelPageModel : PageModel
    {
        public IEnumerable<HotelModel> Hotels { get; set; }
        public int TotalHotelAmount { get; set; }

        public HotelPageModel(int number, int size, int amount, 
           IEnumerable<HotelModel> hotels) : base(number, size)
        {
            Hotels = hotels;
            TotalHotelAmount = amount;
        }
    }
}
