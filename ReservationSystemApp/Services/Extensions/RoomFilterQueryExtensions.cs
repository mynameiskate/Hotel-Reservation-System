using DataLayer;
using DataLayer.Entities;
using Services.Models;
using Services.Models.RequestModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Services.Extensions
{
    public static class RoomFilterQueryExtensions 
    {
        public static IEnumerable<HotelRoomModel> CutList(this IQueryable<HotelRoomModel> rooms,
                                                int pageSize, int pageNumber = 1)
        {
            int startAfter = (pageNumber - 1) * pageSize;
            return rooms.Skip(startAfter).Take(pageSize);
        }

        public static IQueryable<HotelRoom> FilterRooms(this IQueryable<HotelRoom> rooms, 
            FilteredRoomsRequestModel filters, int maxElapsedMinutes, HotelDbContext dataContext = null)
        {
            if (filters == null) return rooms;

            var filteredList = rooms
                    .FilterByAdultAmount(filters.Adults)
                    .FilterByCost(filters.MinCost, filters.MaxCost)
                    .FilterByDateAvailability(filters.MoveInDate, filters.MoveOutDate, maxElapsedMinutes, dataContext);

            if (!string.IsNullOrEmpty(filters.RoomType)) //TODO: add some checks for room types
            { }

            return filteredList;
        }

        public static IQueryable<HotelRoom> FilterByAdultAmount(this IQueryable<HotelRoom> list, int amount)
        {
            return (amount > 0)
                ? list.Where(r => r.Adults == amount)
                : list;
        }

        public static IQueryable<HotelRoom> FilterByCost(this IQueryable<HotelRoom> list, int minCost, int maxCost)
        {
            var filteredList = list; 

            if (minCost > 0)
            {
                filteredList = filteredList.Where(r => r.Cost >= minCost);
            }

            if (maxCost > 0)
            {
                filteredList = filteredList
                    .Where(r => r.Cost <= maxCost);
            }
            return filteredList;
        }

        public static IQueryable<HotelRoom> FilterByDateAvailability(this IQueryable<HotelRoom> list, 
            DateTime? moveInDate, DateTime? moveOutDate, int maxElapsedMinutes, HotelDbContext dataContext)
        {
            if (moveInDate == null || moveOutDate == null || list == null) return list;

            var filteredList = from hr in list
                               join r in dataContext.RoomReservations on hr.HotelRoomId equals r.HotelRoomId into res
                               from r in res.DefaultIfEmpty()
                               join s in dataContext.ReservationStatuses on r.StatusId equals s.ReservationStatusId into srv
                               from status in srv.DefaultIfEmpty()
                               //Here left join is used, that's why RoomReseservationId can be null. 
                               //This check is necessary for including available rooms but without existing reservations.
                               where (r.RoomReservationId == null)
                                        || (r.MoveInDate > moveOutDate || r.MoveOutDate < moveInDate)
                                        || (status.Status == null)
                                        || (status.ReservationStatusId == (int)ReservationStatusEnum.Cancelled)
                                        || ((status.ReservationStatusId == (int)ReservationStatusEnum.Pending)
                                              && HasExpired(r.Created, maxElapsedMinutes))
                               select hr;
            return filteredList;
        }

        private static bool HasExpired(DateTimeOffset startingTime, int secondsLimit)
        {
            return startingTime.AddSeconds(secondsLimit) > DateTimeOffset.UtcNow;
        }
    }
}
