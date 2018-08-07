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
    public class HotelService : IHotelService
    {
        private readonly ILogger _logger;
        private DataContext _dataContext;
        private int _pageSize;
        private int _maxPageSize;

        public HotelService(DataContext dataContext, int pageSize, int maxPageSize)
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

                entityList = FilterHotels(entityList, request).Distinct();

                var resultQuery = entityList
                    .Include(h => h.Location)
                    .ThenInclude(l => l.City)
                    .ThenInclude(c => c.Country)
                    .Select(hotel => new HotelModel(hotel));

                int resultCount = await entityList.CountAsync();
                int currentPage = (request.Page > 0) ? request.Page : 1;

                var listForPage = CutList(resultQuery, size, currentPage);

                return new PageModel(currentPage, size, resultCount, listForPage);
            }
            catch(Exception e)
            {
                _logger.LogInformation(e.Message);
                return null;
            }

        }

        private IEnumerable<HotelModel> CutList(IQueryable<HotelModel> hotels, 
                                                int pageSize, int pageNumber = 1)
        {
            int startAfter = (pageNumber - 1) * pageSize;
            return hotels.Skip(startAfter).Take(pageSize);
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
                
               /* var moveInTime = filters.MoveInTime ?? DateTime.UtcNow.Date;
                var moveOutTime = filters.MoveOutTime;

                if (moveOutTime < moveInTime || moveOutTime == null)
                {
                    moveOutTime = moveInTime.AddDays(1);
                }*/

                if (!(filters.MoveInTime == null || filters.MoveOutTime == null))
                {
                    filteredList = from h in filteredList
                                   join hr in _dataContext.HotelRooms on h.HotelId equals hr.HotelId
                                   join r in _dataContext.Reservations on hr.HotelRoomId equals r.HotelRoomId into res
                                   from r in res.DefaultIfEmpty()
                                   where (r.RoomReservationId == null) ||
                                   !(r.MoveInTime <= filters.MoveOutTime && r.MoveOutTime >= filters.MoveInTime)
                                   select h;
                }

                return filteredList;
            }
            else
            {
                return hotels;
            }
        }

        public async Task<HotelModel> GetHotelInfo(int id)
        {
            var hotelEntity = await _dataContext.Hotels
                         .Include(h => h.Location)
                         .ThenInclude(l => l.City)
                         .ThenInclude(l => l.Country)
                         .FirstAsync(h => h.HotelId == id);
            if (hotelEntity != null)
            {
                return new HotelModel(hotelEntity);
            }
            else
            {
                return null;
            }

        }

        public async void UpdateHotelInfo(int id, Hotel newValue)
        {
            var hotel = await _dataContext.Hotels.FindAsync(id);
            if (hotel != null)
            {
                hotel = newValue;
                /*work in progress*/
                _dataContext.SaveChanges();
            }
        }

        public void Delete(int id)
        {
            Hotel hotel = _dataContext.Hotels.Find(id);
            if (hotel != null)
            {
                hotel.IsRemoved = true;
                _dataContext.Hotels.Update(hotel);
                _dataContext.SaveChanges();
            }
        }
    }
}
