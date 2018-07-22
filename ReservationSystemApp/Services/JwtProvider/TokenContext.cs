using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;

namespace Services.JwtProvider
{
    public class TokenContext
    {
        public string AccessToken { get; set; }

        public ClaimsPrincipal ClaimsPrincipal { get; internal set; }

        public AuthenticationProperties AuthProperties { get; internal set; }
    }
}
