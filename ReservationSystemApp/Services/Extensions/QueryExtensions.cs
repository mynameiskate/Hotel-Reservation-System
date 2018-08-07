using Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

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
    }
}
