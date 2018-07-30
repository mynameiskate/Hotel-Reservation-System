using DataLayer;
using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Services.Interfaces;
using Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.Services
{
    public class HotelPageService : IHotelPageService
    {
        private DataContext _dataContext;
        private int _pageSize;

        public HotelPageService(DataContext dataContext, int pageSize)
        {
            _dataContext = dataContext;
            _pageSize = pageSize;
        }

        public async Task<PageModel> GetHotelPage(int pageNumber = 1, int? pageSize = null, FilterModel filters = null)
        {
            int size = pageSize ?? _pageSize;
            try
            {
                var entityList = _dataContext.Hotels
                                             .Include(h => h.Location)
                                             .ThenInclude(l => l.City)
                                             .ThenInclude(l => l.Country);

                var filteredList = await FilterHotels(entityList, filters)
                                                      .Select(hotel => new HotelModel(hotel))
                                                      .ToListAsync();

                var listForPage = CutList(filteredList, pageNumber, size);

                return new PageModel(pageNumber, size, filteredList.Count, listForPage);
            }
            catch
            {
                return null;
            }

        }

        private IEnumerable<HotelModel> CutList(IEnumerable<HotelModel> hotels, 
                                          int pageNumber, int count)
        {
            int startAfter = (pageNumber-1) * count;
            return hotels.Skip(startAfter).Take(count);
        }

        private bool IsEqual(string a, string b)
        {
            return string.Equals(a, b, StringComparison.CurrentCultureIgnoreCase);
        }

        private bool CheckLocation(Location location, string country, string city)
        {
            return (location == null) ||
                   (location.City == null) ||
                   ((string.IsNullOrEmpty(city) || IsEqual(location.City.Name, city)) &&
                     (string.IsNullOrEmpty(country) || (location.City.Country == null) ||
                        IsEqual(location.City.Country.Name, country)));
        }

        private IQueryable<Hotel> FilterHotels(IIncludableQueryable<Hotel, Country> hotels,
                                               FilterModel filters)
        {
            if (filters != null)
            {
                try
                {
                    var filteredList = hotels.Where(h => (string.IsNullOrEmpty(filters.Name) || IsEqual(h.Name, filters.Name)) &&
                                              (CheckLocation(h.Location, filters.Country, filters.City)));
                    return filteredList;
                }
                catch
                {
                    return null;
                }
            }
            else
            {
                return hotels;
            }
        }
    }
}
