using System.Collections.Generic;

namespace Services.Models.PageModels
{
    public class PageModel<T> 
    {
        public IEnumerable<T> Entities { get; set; }
        public int PageNumber { get; set; } 
        public int PageSize { get; set; }
        public int TotalAmount { get; set; }
        public PageModel(int number, int size, int amount, IEnumerable<T> entities)
        {
            PageNumber = number;
            PageSize = size;
            TotalAmount = amount;
            Entities = entities;
        }
    }
}
