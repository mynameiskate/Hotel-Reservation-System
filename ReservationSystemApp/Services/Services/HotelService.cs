using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using DataLayer;
using Services.Interfaces;

namespace Services.Services
{
    public class HotelService : IHotelService
    {
        private DataContext _dataContext;


        public HotelService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<IEnumerable<Hotel>> GetHotelList()
        {
            DataInitializer.Initialize(_dataContext);
            return await _dataContext.Hotels
                         .Include(h => h.Location)
                         .ToListAsync();
        }

        public async Task<Hotel> GetHotelInfo(int id)
        {
            return await _dataContext.Hotels
                         //.Include(h => h.Location)
                         .FindAsync(id);
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