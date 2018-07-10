using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;
using Services.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DatabaseRepositories.Repositories
{
    public class HotelService : IHotelService
    {
        private DataContext _dataContext;

        public HotelService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<Hotel>> GetHotelList()
        {
             DataInitializer.Initialize(_dataContext);
             return await _dataContext.Hotels.ToListAsync();
        }
    }
}
