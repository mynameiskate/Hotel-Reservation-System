using DatabaseRepositories.ContextFactories;
using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DatabaseRepositories.Repositories
{
    public class HotelRepository : BaseRepository
    {
        public HotelRepository(string connectionString, IDataContextFactory factory) 
            : base(connectionString, factory)
        {}

        public async Task<List<Hotel>> GetHotelList()
        {
            using (var dataContext = DataContextFactory.CreateDataContext(ConnectionString)) 
            {
                return await dataContext.Hotels.ToListAsync();
            }
        }
    }
}
