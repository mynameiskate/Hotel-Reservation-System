using DataLayer.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Services.Models
{
    public class HotelRoomModel
    {
        public int Id { get; set; }
        [Required]
        public int Number { get; set; }
        public bool IsAvailable { get; set; }
        public double Size { get; set; }
        public double Cost { get; set; }
        public int Adults { get; set; }
        public string RoomType { get; set; }
        public List<int> ImageIds { get; set; }

        public HotelRoomModel(HotelRoom room)
        {
            Id = room.HotelRoomId;
            Number = room.Number;
            IsAvailable = room.IsAvailable;
            Size = room.Size;
            Cost = room.Cost;
            Adults = room.Adults;
            RoomType = room.RoomType?.RoomTypeName;
            ImageIds = room?.Images?.Select(img => img.ImageId).ToList();
        }

        public HotelRoomModel() {}
    }
}
