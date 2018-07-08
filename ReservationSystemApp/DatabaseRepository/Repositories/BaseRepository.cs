using DatabaseRepositories.ContextFactories;

namespace DatabaseRepositories.Repositories
{
    public abstract class BaseRepository
    {
        protected string ConnectionString { get; }
        protected IDataContextFactory DataContextFactory { get; }
        public BaseRepository(string connectionString, IDataContextFactory dataContextFactory)
        {
            ConnectionString = connectionString;
            DataContextFactory = dataContextFactory;
        }
    }
}
