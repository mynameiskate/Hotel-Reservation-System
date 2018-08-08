using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using DataLayer;
using System.Linq;
using Services.Models;
using System;
using Microsoft.Extensions.Logging;
using ReservationSystemApp.Services;
using Services.Interfaces;

namespace Services.Services
{
    public class LocationService : ILocationService
    {
        private readonly ILogger _logger;
        private HotelDbContext _dataContext;

        public LocationService(HotelDbContext dataContext)
        {
            _dataContext = dataContext;
            _logger = AppLogging.LoggerFactory.CreateLogger<LocationService>();
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
            catch (Exception e)
            {
                _logger.LogInformation(e.Message);
                throw;
            }
        }   
    }
}