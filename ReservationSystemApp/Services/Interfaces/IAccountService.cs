using DataLayer.Entities;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IAccountService
    {
        Task<User> Authenticate(string email, string password);
        Task<User> SignUp(User user, string password);
       // void Edit(User user);
       //void SignOut(int id);
       //void Delete(int id);
    }
}
