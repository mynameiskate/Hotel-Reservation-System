using DataLayer.Entities;
using System.Collections.Generic;

namespace Services.Models
{
    public class HotelRoomModel
    {
        public int Number { get; set; }
        public bool Available { get; set; }
        public float Size { get; set; }
        public float Cost { get; set; }
        public int CanPlace { get; set; }
        public RoomType RoomType { get; set; }
        public List<string> Images { get; set; }

        public HotelRoomModel(HotelRoom room)
        {
            if (room != null)
            {
                Number = room.Number;
                Available = room.IsAvailable;
                Size = room.Size;
                Cost = room.Cost;
                CanPlace = room.CanPlace;
                RoomType = room.RoomType;

                if (room.Images != null)
                {
                    foreach (var filePath in room.Images)
                    {
                        Images.Add(filePath.Path);
                    }
                }
            }

        }

        public HotelRoomModel() {}
    }
}
