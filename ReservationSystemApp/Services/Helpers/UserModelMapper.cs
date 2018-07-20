using DataLayer.Entities;
using Services.Models;

namespace Services.Helpers
{
    public static class UserModelMapper
    {
        public static User ConvertToUser(this UserModel model)
        {
            if (model == null) return null;

            return new User
            {
                UserId = model.UserId,
                ShortName = model.ShortName,
                FullName = model.FullName,
                IsAdmin = model.IsAdmin,
            };
        }
    }
}
