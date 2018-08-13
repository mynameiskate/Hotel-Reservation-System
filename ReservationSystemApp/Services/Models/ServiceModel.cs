using DataLayer.Entities;

namespace Services.Models
{
    public class ServiceModel
    {
        public int HotelServiceId { get; set; }
        public string Name { get; set; }
        public double Cost { get; set; }

        public ServiceModel (HotelService service, string serviceName = null)
        {
            if (service != null)
            {
                HotelServiceId = service.HotelServiceId;
                Name = serviceName;
                Cost = service.Cost;
            }
        }

        public ServiceModel() {}
    }
}
