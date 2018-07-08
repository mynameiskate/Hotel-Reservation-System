using Microsoft.EntityFrameworkCore;

namespace DatabaseRepositories.ContextFactories
{
    public class SqlDataContextFactory : IDataContextFactory
    {
        public DataContext CreateDataContext(string connectionString) 
        {
            DbContextOptionsBuilder optionsBuilder = new DbContextOptionsBuilder<DataContext>();
            optionsBuilder.UseSqlServer(connectionString);

            return new DataContext(optionsBuilder.Options);
        }
    }
}
