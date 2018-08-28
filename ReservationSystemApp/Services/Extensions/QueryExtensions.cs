using System.Collections.Generic;
using System.Linq;

namespace Services.Extensions
{
    static class QueryExtensions
    {
        public static IEnumerable<T> CutList<T>(this IQueryable<T> hotels,
                                        int pageSize, int pageNumber = 1)
        {
            int startAfter = (pageNumber - 1) * pageSize;
            return hotels.Skip(startAfter).Take(pageSize);
        }
    }
}
