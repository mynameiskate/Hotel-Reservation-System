using DataLayer;
using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ReservationSystemApp.Services;
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
        private readonly ILogger _logger;
        private DataContext _dataContext;
        private int _pageSize;
        private int _maxPageSize;

        public HotelPageService(DataContext dataContext, int pageSize, int maxPageSize)
        {
            _dataContext = dataContext;
            _pageSize = pageSize;
            _maxPageSize = maxPageSize;
            _logger = AppLogging.LoggerFactory.CreateLogger<AccountService>();
        }

        public async Task<PageModel> GetHotelPage(PageRequestModel request)
        {
            int size = request.PageSize ?? _pageSize; 
            if (size > _maxPageSize)
            {
                size = _pageSize;
            }

            try
            {
                var entityList = _dataContext.Hotels as IQueryable<Hotel>;

                entityList = FilterHotels(entityList, request);

                var resultQuery = entityList
                    .Include(h => h.Location)
                    .ThenInclude(l => l.City)
                    .ThenInclude(c => c.Country)
                    .Select(hotel => new HotelModel(hotel));

                var listForPage = CutList(resultQuery, size, request.Page);

                return new PageModel(request.Page, size, await entityList.CountAsync(), listForPage);
            }
            catch(Exception e)
            {
                _logger.LogInformation(e.Message);
                return null;
            }

        }

        private IEnumerable<HotelModel> CutList(IQueryable<HotelModel> hotels, 
                                                int count, int pageNumber = 1)
        {
            int startAfter = (pageNumber-1) * count;
            return hotels.Skip(startAfter).Take(count);
        }

        private IQueryable<Hotel> FilterHotels(IQueryable<Hotel> hotels, FilterModel filters)
        {
            if (filters != null)
            {
                var filteredList = hotels;

                if (!string.IsNullOrEmpty(filters.Name))
                {
                    filteredList = filteredList
                        .Where(h =>  h.Name == filters.Name);
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

                return filteredList;
            }
            else
            {
                return hotels;
            }
        }
    }
}
