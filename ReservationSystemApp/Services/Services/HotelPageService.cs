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
                var entityList = _dataContext.Hotels as IQueryable<Hotel>;

               /* if (filters?.Country != null)
                {
                    entityList = entityList.Where(h => h.Location.City.Country.Name == filters.Country);
                }*/

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
