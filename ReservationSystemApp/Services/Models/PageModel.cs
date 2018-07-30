using System.Collections.Generic;

namespace Services.Models
{
    public class PageModel
    {
        public int Number { get; set; }
        public int PageSize { get; set; }
        public int TotalHotelAmount { get; set; }
        public IEnumerable<HotelModel> Hotels  {get; set;}

        public PageModel(int number, int size, 
                         int amount, IEnumerable<HotelModel> hotels)
        {
            Number = number;
            PageSize = size;
            TotalHotelAmount = amount;
            Hotels = hotels;
        }
    }
}
