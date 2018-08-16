using Microsoft.EntityFrameworkCore;

namespace Services.Extensions
{
    public static class UpdateQueryExtensions
    {
        public static void AddOrUpdate<T>(this T entity, bool isNew, DbContext context) where T: class
        {
            context.Entry(entity).State =  isNew
                                           ? EntityState.Added
                                           : EntityState.Modified;       
        }
    }
}
