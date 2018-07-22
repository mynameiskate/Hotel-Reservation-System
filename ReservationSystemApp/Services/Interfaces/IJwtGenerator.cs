using DataLayer.Entities;
using Services.JwtProvider;

namespace Services.Interfaces
{
    public interface IJwtGenerator
    {
        string GenerateAccessToken(User user);

        TokenContext GenerateTokenContext(User user);
    }
}
