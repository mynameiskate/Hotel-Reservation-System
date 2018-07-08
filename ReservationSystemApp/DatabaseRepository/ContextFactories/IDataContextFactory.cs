namespace DatabaseRepositories.ContextFactories
{
    public interface IDataContextFactory
    {
        DataContext CreateDataContext(string connectionString);
    }
}
