using DataLayer.Entities;
using Services.Models;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IAccountService
    {
        Task<User> Authenticate(string email, string password);
        Task<User> SignUp(User user, string password);
        Task<UserModel> GetProfileInfo(string email);
       // void Edit(User user);
       //void SignOut(int id);
       //void Delete(int id);
    }
}
