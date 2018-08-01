namespace Services.Models
{
    public class PageRequestModel : FilterModel
    {
        public int Page { get; set; }
        public int? PageSize { get; set; }
    }
}
