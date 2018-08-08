using DataLayer.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Services.Models
{
    public class HotelRoomModel
    {
        public int Number { get; set; }
        public bool Available { get; set; }
        public double Size { get; set; }
        public double Cost { get; set; }
        public int CanPlace { get; set; }
        public string RoomType { get; set; }
        public List<string> Images { get; set; }

        public HotelRoomModel(HotelRoom room)
        {
            if (room != null)
            {
                Number = room.Number;
                Available = room.IsAvailable;
                Size = room.Size;
                Cost = room.Cost;
                CanPlace = room.Adults;
                RoomType = room.RoomType?.RoomTypeName;

                Images = room.Images?
                        .Select(img => img.Path)
                        .ToList() ?? new List<string>();
            }

        }

        public HotelRoomModel() {}
    }
}
