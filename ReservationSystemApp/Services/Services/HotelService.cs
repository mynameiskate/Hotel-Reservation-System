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
        private int _maxElapsedMinutes; 

        public HotelService(HotelDbContext dataContext, int pageSize, int maxPageSize, int maxElapsedMinutes)
        {
            _dataContext = dataContext;
            _pageSize = pageSize;
            _maxPageSize = maxPageSize;
            _maxElapsedMinutes = maxElapsedMinutes;
            _logger = AppLogging.LoggerFactory.CreateLogger<AccountService>();
        }

        private IQueryable<DataLayer.Entities.HotelService> GetServiceQuery(int hotelId)
        {
            var entityList = _dataContext.HotelServices as IQueryable<DataLayer.Entities.HotelService>;
            return entityList.Where(s => s.HotelId == hotelId && !s.IsRemoved);
        }

        public async Task<List<ServiceModel>> GetPossibleServices()
        {
            return await _dataContext.Services
                    .Select(s => new ServiceModel(s))
                    .ToListAsync();
        }

        public async Task<ServiceModel> CreateHotelService(int hotelId, ServiceModel service)
        {
            var hotelService = new DataLayer.Entities.HotelService
            {
                ServiceId = service.ServiceId,
                Cost = service.Cost,
                HotelId = hotelId
            };

            await _dataContext.HotelServices.AddAsync(hotelService);
            await _dataContext.SaveChangesAsync();
            return new ServiceModel(hotelService);
        }

        public async Task<List<ServiceModel>> GetAvailableServices(int hotelId)
        {
            try
            {
                var resultQuery = GetServiceQuery(hotelId)
                    .Join(_dataContext.Services,
                     hs => hs.ServiceId,
                     s => s.ServiceId,
                     (hs, s) => new ServiceModel(hs, s.Name));

                return await resultQuery.ToListAsync();
            }
            catch (Exception e)
            {
                _logger.LogInformation(e.Message);
                throw;
            }
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
                    .FilterHotels(request, _maxElapsedMinutes, _dataContext)
                    .Distinct()
                    .Include(h => h.Services)
                    .Include(h => h.Location)
                    .ThenInclude(l => l.City)
                    .ThenInclude(c => c.Country)
                    .Select(hotel => new HotelModel(hotel));
               
                int resultCount = await resultQuery.CountAsync();
                int currentPage = (request.Page > 0) ? request.Page : 1;

                var listForPage = resultQuery.CutList(size, currentPage);

                return new PageModel<HotelModel>(currentPage, size, resultCount, listForPage);
            }
            catch(Exception e)
            {
                _logger.LogInformation(e.Message);
                throw;
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
                    .FilterRooms(request, _maxElapsedMinutes, _dataContext)
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
                throw;
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

        public async Task UpdateHotelInfo(HotelModel hotelInfo) //TODO: do something with contacts
        {
            var hotel = await _dataContext.Hotels.FirstOrDefaultAsync(h => h.HotelId == hotelInfo.HotelId);
            if (hotel == null)
            {
                throw new ArgumentException();
            }

            await UpdateLocation(hotel.LocationId, hotelInfo.Location);

            hotel.Name = hotelInfo.Name;
            hotel.Stars = hotelInfo.Stars;
            hotel.Services = await GetUpdatedServices(hotelInfo.HotelId, hotelInfo.Services);
            _dataContext.Update(hotel);
            await _dataContext.SaveChangesAsync();
        }

        public async Task UpdateHotelRoomInfo(int hotelId, HotelRoomModel roomInfo) 
        {
            var hotelRoom = await _dataContext.HotelRooms.FindAsync(roomInfo.Id);
            if (hotelRoom == null)
            {
                throw new ArgumentException();
            }

            hotelRoom.Cost = roomInfo.Cost;
            hotelRoom.Adults = roomInfo.Adults;
            hotelRoom.IsAvailable = roomInfo.IsAvailable;
            
            await _dataContext.SaveChangesAsync();
        }

        public async Task<HotelModel> AddHotel(HotelModel hotelInfo)
        {
            var hotel = new Hotel
            {
                Name = hotelInfo.Name,
                Location = new Location
                {
                    Address = hotelInfo.Location.Address,
                    CityId = hotelInfo.Location.CityId,
                },
                Stars = hotelInfo.Stars
            };

            await _dataContext.Hotels.AddAsync(hotel);
            await _dataContext.SaveChangesAsync();

            return new HotelModel(hotel);
        }

        public async Task<HotelRoomModel> AddHotelRoom(int hotelId, HotelRoomModel roomInfo)
        {
            var hotel = await _dataContext.Hotels.FindAsync(hotelId);
            if (hotel == null)
            {
                throw new ArgumentException();
            }

            var hotelRoom = new HotelRoom
            {
                HotelId = hotelId,
                Adults = roomInfo.Adults,
                Cost = roomInfo.Cost,
                Number = roomInfo.Number,
                IsAvailable = roomInfo.IsAvailable
            };

            await _dataContext.HotelRooms.AddAsync(hotelRoom);
            await _dataContext.SaveChangesAsync();

            return new HotelRoomModel(hotelRoom);
        }


        private async Task UpdateLocation(int locationId, LocationModel locationModel)
        {
            if (locationModel == null) return;
            var currentLocation = await _dataContext.Locations.FirstAsync(l => l.LocationId == locationId);
            currentLocation.Address = locationModel.Address;
            currentLocation.CityId = (int)locationModel.CityId;
            _dataContext.Update(currentLocation);
        }

        private async Task<List<DataLayer.Entities.HotelService>> GetUpdatedServices(int hotelId, List<ServiceModel> serviceModels)
        {
            if (serviceModels == null) return null; 

            var existingServices = GetServiceQuery(hotelId);

            foreach (var service in existingServices)
            {
                var serviceModel = serviceModels.FirstOrDefault(sm => sm.ServiceId == service.ServiceId);
                service.IsRemoved = (serviceModel == null) || service.IsRemoved;
                if (serviceModel == null || serviceModel.IsRemoved)
                {
                    service.IsRemoved = true;
                }
                else
                {
                    service.Cost = serviceModel.Cost;
                }
            }

            return await existingServices.ToListAsync();         
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
