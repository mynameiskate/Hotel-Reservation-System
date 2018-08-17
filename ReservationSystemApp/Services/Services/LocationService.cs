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
using DataLayer.Entities;
using Services.Exceptions;

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
                                .GroupBy(l => l.CityId)
                                .Select(group => group.First())
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

        public async Task<Location> GetLocation(LocationModel locationModel)
        {
            if (!CityExists(locationModel.CountryId, locationModel.CityId))
            {
                throw new LocationNotFoundException();
            }

            return await _dataContext.Locations
                          .FirstOrDefaultAsync(l => l.City.CityId == locationModel.CityId
                            && l.Address == locationModel.Address);
        }

        public async Task<Location> AddLocation(LocationModel locationModel)
        {
            var locationEntity = new Location
            {
                Address = locationModel.Address,
                CityId = locationModel.CityId,
            };

            await _dataContext.Locations.AddAsync(locationEntity);
            await _dataContext.SaveChangesAsync();
            return locationEntity;
        }

        private bool CityExists(string countryId, int cityId)
        {
            return  _dataContext.Cities.Any(c => c.CityId == cityId && c.CountryId == countryId);
        }
    }
}