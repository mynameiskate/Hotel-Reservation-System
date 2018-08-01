using Microsoft.AspNetCore.Mvc;

namespace ReservationSystemApp.Controllers
{
    public class DefaultController : ControllerBase
    {
        private string _indexPath = "~/index.html";
        public IActionResult Index()
        {
            return File(_indexPath, "text/html");
        }
    }
}
