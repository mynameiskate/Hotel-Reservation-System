using DataLayer.Entities;

namespace Services.Models
{
    public class ServiceModel
    {
        public int HotelServiceId { get; set; }
        public string Name { get; set; }
        public float Cost { get; set; }

        public ServiceModel (HotelService service)
        {
            if (service != null)
            {
                HotelServiceId = service.HotelServiceId;
                Name = service.Name;
                Cost = service.Cost;
            }
        }

        public ServiceModel() {}
    }
}
