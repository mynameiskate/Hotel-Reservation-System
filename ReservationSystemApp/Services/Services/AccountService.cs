using DataLayer;
using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;
using Services.Interfaces;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
    public class AccountService : IAccountService
    {
        private readonly DataContext _dataContext;
        private static RNGCryptoServiceProvider _cryptoProvider;
        private const int _saltLength = 32;

        public AccountService(DataContext dataContext)
        {
            _dataContext = dataContext;
            _cryptoProvider = new RNGCryptoServiceProvider();
        }

        public async Task<User> Authenticate(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password)) return null;

            User user = await _dataContext.Users
                              .FirstAsync(account => account.Email == email);
            if (user != null)
            {
                if (VerifyPassword(password, user.PasswordHash, user.PasswordSalt))
                {
                    return user;
                }
            }

            return null;
        }

        public async Task<User> SignUp(User user, string password)
        {
            if (string.IsNullOrEmpty(password) || user == null) return null;

            bool userExists = await _dataContext.Users.
                                    AnyAsync(account => account.Email == user.Email);
            if (!userExists)
            {
                user.PasswordSalt = ComputeSalt();
                user.PasswordHash = ComputeHash(password, user.PasswordSalt);

                await _dataContext.AddAsync(user);
                await _dataContext.SaveChangesAsync();
                return user;
            }
            return null;
        }

        private static bool VerifyPassword(string password, byte[] computedHash, byte[] computedSalt)
        {
            if (computedHash == null || computedSalt == null) return false;

            var passwordHash = Encoding.UTF8.GetBytes(password);
            if (passwordHash.Length != computedHash.Length) return false;

            for (int i = 0; i < computedHash.Length; i ++)
            {
                if (computedHash[i] != passwordHash[i]) return false;
            }

            return true;
        }

        private static byte[] ComputeHash(string password, byte[] salt)
        {
            salt = null;
            if (string.IsNullOrEmpty(password)) return null;

            var plainText = Encoding.UTF8.GetBytes(password);

            HashAlgorithm sha = new SHA256Managed();
            byte[] passwordWithSalt = plainText.Concat(salt).ToArray();

            return sha.ComputeHash(passwordWithSalt);
        }

        private static byte[] ComputeSalt(int maxLength = _saltLength)
        {
            var salt = new byte[maxLength];
            _cryptoProvider.GetNonZeroBytes(salt);
            return salt;
        }
    }
}