using DataLayer;
using DataLayer.Entities;
using Services.Models;
using Services.Models.RequestModels;
using System.Collections.Generic;
using System.Linq;

namespace Services.Extensions
{
    public static class QueryExtensions
    {
        public static IEnumerable<HotelModel> CutList(this IQueryable<HotelModel> hotels,
                                                int pageSize, int pageNumber = 1)
        {
            int startAfter = (pageNumber - 1) * pageSize;
            return hotels.Skip(startAfter).Take(pageSize);
        }

        public static IEnumerable<HotelRoomModel> CutList(this IQueryable<HotelRoomModel> rooms,
                                                int pageSize, int pageNumber = 1)
        {
            int startAfter = (pageNumber - 1) * pageSize;
            return rooms.Skip(startAfter).Take(pageSize);
        }

        public static IQueryable<Hotel> FilterHotels(this IQueryable<Hotel> hotels,
            FilteredHotelsRequestModel filters, HotelDbContext dataContext)
        {
            if (filters != null)
            {
                var filteredList = hotels;

                if (!string.IsNullOrEmpty(filters.Name))
                {
                    filteredList = filteredList
                        .Where(h => h.Name == filters.Name);
                }

                if (!string.IsNullOrEmpty(filters.CountryId))
                {
                    filteredList = filteredList
                        .Where(h => h.Location.City.CountryId == filters.CountryId);

                    if (!string.IsNullOrEmpty(filters.City))
                    {
                        filteredList = filteredList
                            .Where(h => h.Location.City.Name == filters.City);
                    }
                }

                /* var moveInTime = filters.MoveInTime ?? DateTime.UtcNow.Date;
               var moveOutTime = filters.MoveOutTime;

               if (moveOutTime < moveInTime || moveOutTime == null)
               {
                   moveOutTime = moveInTime.AddDays(1);
               }*/

                if (!(filters.MoveInDate == null || filters.MoveOutDate == null))
                {
                    filteredList = from h in filteredList
                                   join hr in dataContext.HotelRooms on h.HotelId equals hr.HotelId
                                   join r in dataContext.Reservations on hr.HotelRoomId equals r.HotelRoomId into res
                                   from r in res.DefaultIfEmpty()
                                       //Here left join is used, that's why RoomReseservationId can be null. 
                                       //This check is necessary for including hotels with available rooms but without existing reservations.
                                   where (r.RoomReservationId == null) ||
                                   !(r.MoveInDate <= filters.MoveOutDate && r.MoveOutDate >= filters.MoveInDate)
                                   select h;
                }

                return filteredList;
            }
            else
            {
                return hotels;
            }
        }

        public static IQueryable<HotelRoom> FilterRooms(this IQueryable<HotelRoom> rooms, 
            FilteredRoomsRequestModel filters, HotelDbContext dataContext = null)
        {
            if (filters != null)
            {
                var filteredList = rooms;

                if (filters.Adults > 0)
                {
                    filteredList = filteredList
                        .Where(r => r.Adults == filters.Adults);
                }

                if (filters.MinCost > 0) 
                {
                    filteredList = filteredList
                        .Where(r => r.Cost >= filters.MinCost);
                }

                if (filters.MaxCost > 0)
                {
                    filteredList = filteredList
                        .Where(r => r.Cost <= filters.MaxCost);
                }

                if (!string.IsNullOrEmpty(filters.RoomType)) //TODO: add some checks for room types
                {}

                return filteredList;
            }
            else
            {
                return rooms;
            }
        }
    }
}
