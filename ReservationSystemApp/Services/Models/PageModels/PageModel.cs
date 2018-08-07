namespace Services.Models.PageModels
{
    public abstract class PageModel
    {
        public int Number { get; set; }
        public int PageSize { get; set; }
        public PageModel(int number, int size)
        {
            Number = number;
            PageSize = size;
        }
    }
}
