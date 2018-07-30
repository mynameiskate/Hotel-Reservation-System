namespace Services.Models
{
    public class PageRequestModel 
    {
        public int Page { get; set; }
        //public int? PageSize { get; set; }
        public FilterModel Filters { get; set; }
    }
}
