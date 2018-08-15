using DataLayer;
using DataLayer.Entities;
using Services.Models;
using Services.Models.RequestModels;
using System.Collections.Generic;
using System.Linq;

namespace Services.Extensions
{
    public static class HotelFilterQueryExtensions
    {
        public static IEnumerable<HotelModel> CutList(this IQueryable<HotelModel> hotels,
                                                int pageSize, int pageNumber = 1)
        {
            int startAfter = (pageNumber - 1) * pageSize;
            return hotels.Skip(startAfter).Take(pageSize);
        }

        public static IQueryable<Hotel> FilterHotels(this IQueryable<Hotel> hotels,
            FilteredHotelsRequestModel filters, int maxElapsedMinutes, HotelDbContext dataContext)
        {
            if (filters == null) return hotels;

            if (filters.HotelId != null)
            {
                return hotels.FilterById(filters.HotelId);
            }

            var filteredList = hotels.FilterByName(filters.Name)
                                     .FilterByLocation(filters.CountryId, filters.CityId);

            var roomList = dataContext.HotelRooms;

            var filteredRoomList = roomList
                .FilterByAdultAmount(filters.Adults)
                .FilterByDateAvailability(filters.MoveInDate, filters.MoveOutDate, maxElapsedMinutes, dataContext);

           filteredList = from hr in filteredRoomList
                          join h in filteredList on hr.HotelId equals h.HotelId into result
                          from h in result
                          select h;

            return filteredList.Distinct();
        }

        static IQueryable<Hotel> FilterById(this IQueryable<Hotel> list, int? hotelId)
        {
            return list.Where(h => h.HotelId == hotelId);
        }

        static IQueryable<Hotel> FilterByName(this IQueryable<Hotel> list, string hotelName)
        {
            return (string.IsNullOrEmpty(hotelName))
                    ? list
                    : list.Where(h => h.Name == hotelName);
        }

        static IQueryable<Hotel> FilterByLocation(this IQueryable<Hotel> list, string countryId, int? cityId)
        {
            if (string.IsNullOrEmpty(countryId)) return list;

            var filteredList = list.Where(h => h.Location.City.CountryId == countryId);

            if (cityId == 0) return filteredList;

            return filteredList.Where(h => h.Location.CityId == cityId);
        }
    }
}
