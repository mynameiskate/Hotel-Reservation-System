using DataLayer.Entities;
using Microsoft.AspNetCore.Authentication;
using Microsoft.IdentityModel.Tokens;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Services.JwtProvider
{
    public class JwtGenerator : IJwtGenerator
    {
        private readonly JwtOptions _options;
        private IEnumerable<Claim> _userClaims;

        public JwtGenerator(JwtOptions options)
        {
            _options = options;
        }

        private IEnumerable<Claim> CreateClaims(User user)
        {
            _userClaims = new Claim[]
            {
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.IsAdmin ?
                                               "Administrator"
                                               : "User")
            };
            return _userClaims;
        }

        public string GenerateAccessToken(User user)
        {
            var credentials = new SigningCredentials(_options.Key, _options.Algorithm);
            var currentTime = DateTime.UtcNow;

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Audience = _options.Audience,   
                Issuer = _options.Issuer,
                Subject = new ClaimsIdentity(CreateClaims(user)),
                NotBefore = currentTime,
                Expires = currentTime.Add(_options.Expiration),
                SigningCredentials = credentials,
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }


        private static IEnumerable<Claim> GetDefaultClaims(string username, 
            IEnumerable<Claim> userClaims)
        {
            var claims = new List<Claim>(userClaims)
                {
                    new Claim(ClaimTypes.Name, username),
                    new Claim(JwtRegisteredClaimNames.Sub, username),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.TimeOfDay.Ticks.ToString(),
                        ClaimValueTypes.Integer64)
                };

            return claims;
        }
    }
}
