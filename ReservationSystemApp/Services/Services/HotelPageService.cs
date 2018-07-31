using DataLayer;
using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;
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
        private int _maxPageSize;

        public HotelPageService(DataContext dataContext, int pageSize, int maxPageSize)
        {
            _dataContext = dataContext;
            _pageSize = pageSize;
            _maxPageSize = maxPageSize;
        }

        public async Task<PageModel> GetHotelPage(int pageNumber = 1, int? pageSize = null, FilterModel filters = null)
        {
            int size = pageSize ?? _pageSize; 
            if (size > _maxPageSize)
            {
                size = _pageSize;
            }

            try
            {
                var entityList = _dataContext.Hotels as IQueryable<Hotel>;

                entityList = FilterHotels(entityList, filters);

                var resultQuery = entityList
                    .Include(h => h.Location)
                    .ThenInclude(l => l.City)
                    .ThenInclude(c => c.Country)
                    .Select(hotel => new HotelModel(hotel));

                var listForPage = CutList(resultQuery, pageNumber, size);

                return new PageModel(pageNumber, size, await entityList.CountAsync(), listForPage);
            }
            catch
            {
                return null;
            }

        }

        private IEnumerable<HotelModel> CutList(IQueryable<HotelModel> hotels, 
                                          int pageNumber, int count)
        {
            int startAfter = (pageNumber-1) * count;
            return hotels.Skip(startAfter).Take(count);
        }

        private bool IsEqual(string a, string b)
        {
            return string.Equals(a, b, StringComparison.CurrentCultureIgnoreCase);
        }

        private bool CheckLocation(City city, string filterCity, string filterCountryId)
        {
            if (city == null)
            {
                return false;
            }
            else
            {
                var res = (string.IsNullOrEmpty(filterCity) || IsEqual(city.Name, filterCity)) &&
                          (string.IsNullOrEmpty(filterCountryId) || city.CountryId == filterCountryId);
                return res;
            }
        }

        private IQueryable<Hotel> FilterHotels(IQueryable<Hotel> hotels, FilterModel filters)
        {
            if (filters != null)
            {
                var filteredList = hotels.Where(h => (string.IsNullOrEmpty(filters.Name) || IsEqual(h.Name, filters.Name)))
                                         .Where(h => CheckLocation(h.Location.City, filters.City, filters.CountryId));

                return filteredList;
            }
            else
            {
                return hotels;
            }
        }
    }
}
