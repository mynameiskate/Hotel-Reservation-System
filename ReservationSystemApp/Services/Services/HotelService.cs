using DataLayer;
using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ReservationSystemApp.Services;
using Services.Extensions;
using Services.Interfaces;
using Services.Models;
using Services.Models.PageModels;
using Services.Models.RequestModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.Services
{
    public class HotelService : IHotelService
    {
        private readonly ILogger _logger;
        private HotelDbContext _dataContext;
        private int _pageSize;
        private int _maxPageSize;

        public HotelService(HotelDbContext dataContext, int pageSize, int maxPageSize)
        {
            _dataContext = dataContext;
            _pageSize = pageSize;
            _maxPageSize = maxPageSize;
            _logger = AppLogging.LoggerFactory.CreateLogger<AccountService>();
        }

        public async Task<PageModel<HotelModel>> GetHotelPage(FilteredHotelsRequestModel request)
        {
            int size = request.PageSize ?? _pageSize; 
            if (size > _maxPageSize)
            {
                size = _pageSize;
            }

            try
            {
                var entityList = _dataContext.Hotels as IQueryable<Hotel>;

                var resultQuery = entityList
                    .FilterHotels(request, _dataContext)
                    .Distinct()
                    .Include(h => h.Location)
                    .ThenInclude(l => l.City)
                    .ThenInclude(c => c.Country)
                    .Select(hotel => new HotelModel(hotel));

                int resultCount = await entityList.CountAsync();
                int currentPage = (request.Page > 0) ? request.Page : 1;

                var listForPage = resultQuery.CutList(size, currentPage);

                return new PageModel<HotelModel>(currentPage, size, resultCount, listForPage);
            }
            catch(Exception e)
            {
                _logger.LogInformation(e.Message);
                return null;
            }
        }

        public async Task<PageModel<HotelRoomModel>> GetHotelRooms(int hotelId, FilteredRoomsRequestModel request)
        {
            int size = request.PageSize ?? _pageSize;
            if (size > _maxPageSize)
            {
                size = _pageSize;
            }

            try
            {
                var entityList = _dataContext.HotelRooms as IQueryable<HotelRoom>;

                var resultQuery = entityList
                    .Include(r => r.RoomType)
                    .Where(r => r.HotelId == hotelId)
                    .FilterRooms(request)
                    .Distinct()
                    .Select(r => new HotelRoomModel(r));

                int resultCount = await resultQuery.CountAsync();
                int currentPage = (request.Page > 0) ? request.Page : 1;

                var listForPage = resultQuery.CutList(size, currentPage);

                return new PageModel<HotelRoomModel>(currentPage, size, resultCount, listForPage);
            }
            catch (Exception e)
            {
                _logger.LogInformation(e.Message);
                return null;
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
