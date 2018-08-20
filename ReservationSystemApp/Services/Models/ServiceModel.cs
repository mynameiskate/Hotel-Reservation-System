using DataLayer.Entities;
using System.ComponentModel.DataAnnotations;

namespace Services.Models
{
    public class ServiceModel
    {
        [Required]
        public int ServiceId { get; set; }
        public int HotelServiceId { get; set; }
        public string Name { get; set; }
        public double Cost { get; set; }
        public bool IsRemoved { get; set; }

        public ServiceModel(HotelService service, string serviceName = null)
        {
            if (service != null)
            {
                ServiceId = service.ServiceId;
                HotelServiceId = service.HotelServiceId;
                Name = serviceName;
                Cost = service.Cost;
                IsRemoved = service.IsRemoved;
            }
        }

        public ServiceModel(Service service)
        {
            if (service != null)
            {
                Name = service.Name;
                ServiceId = service.ServiceId;
                IsRemoved = false;
            }
        }

        public ServiceModel() {}
    }
}
