using System;
using System.Collections.Generic;

namespace Services.Models
{
    public class PageModel
    {
        public int Number { get; set; }
        public int PageSize { get; set; }
        public int TotalAmount { get; set; }
        public IEnumerable<HotelModel> Hotels  {get; set;}

        public PageModel(int number, int size, 
                         int amount, IEnumerable<HotelModel> hotels)
        {
            PageSize = size;
            TotalAmount = (int)Math.Ceiling(amount / (double)size);
            Hotels = hotels;
        }

        public bool HasPreviousPage
        {
            get
            {
                return Number > 1;
            }
        }

        public bool HasNextPage
        {
            get
            {
                return Number < TotalAmount;
            }
        }
    }
}
