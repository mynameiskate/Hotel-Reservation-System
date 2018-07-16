using Microsoft.AspNetCore.Mvc;
using System.IO;

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
