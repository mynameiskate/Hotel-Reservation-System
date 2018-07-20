using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using DataLayer;
using Services.Interfaces;
using System.Linq;
using Services.Models;

namespace Services.Services
{
    public class HotelService : IHotelService
    {
        private DataContext _dataContext;


        public HotelService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<IEnumerable<HotelModel>> GetHotelList()
        {
            var entityList = await _dataContext.Hotels
                         .Include(h => h.Location)
                         .ToListAsync();
            var modelList = entityList
                            .Select(hotel => new HotelModel(hotel))
                            .ToList();
            return modelList;
        }

        public async Task<HotelModel> GetHotelInfo(int id)
        {
             var hotelEntity = await _dataContext.Hotels
                         .Include(h => h.Location)
                         .FirstAsync(h => h.HotelId == id);
            return new HotelModel(hotelEntity);
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