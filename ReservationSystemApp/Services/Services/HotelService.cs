using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using DataLayer;
using Services.Interfaces;
using System.Linq;
using Services.Models;
using System;
using Microsoft.Extensions.Logging;
using ReservationSystemApp.Services;

namespace Services.Services
{
    public class HotelService : IHotelService 
    {
        private readonly ILogger _logger;
        private DataContext _dataContext;

        public HotelService(DataContext dataContext)
        {
            _dataContext = dataContext;
            _logger = AppLogging.LoggerFactory.CreateLogger<AccountService>();
        }

        public async Task<IEnumerable<LocationModel>> GetLocationList() 
        {
            try
            {
                var modelList = await _dataContext.Locations
                                .Include(l => l.City)
                                .ThenInclude(c => c.Country)
                                .Select(location => new LocationModel(location))
                                .ToListAsync();
                return modelList;
            }
            catch(Exception e)
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