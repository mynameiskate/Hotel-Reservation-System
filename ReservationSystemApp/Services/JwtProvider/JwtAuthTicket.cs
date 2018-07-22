using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace Services.JwtProvider
{
    //Data format for storing JWT in a cookie
    public class JwtAuthTicket : ISecureDataFormat<AuthenticationTicket>
    {
        private readonly TokenValidationParameters _validationParameters;
        private readonly IDataSerializer<AuthenticationTicket> _ticketSerializer;
        private readonly IDataProtector _dataProtector;

        public JwtAuthTicket(TokenValidationParameters validationParameters,
                             IDataSerializer<AuthenticationTicket> ticketSerializer,
                             IDataProtector dataProtector)
        {
            _validationParameters = validationParameters;
            _ticketSerializer = ticketSerializer;
            _dataProtector = dataProtector;
        }

        //Serialize and encode ticket
        public string Protect(AuthenticationTicket data) => Protect(data, null);

        public string Protect(AuthenticationTicket data, string purpose)
        {
            byte[] serializedData = _ticketSerializer.Serialize(data);
            serializedData = _dataProtector.Protect(serializedData);
            return Base64UrlTextEncoder.Encode(serializedData);
        }

        //Decode and deserialize ticket
        public AuthenticationTicket Unprotect(string data) => Unprotect(data, null);

        public AuthenticationTicket Unprotect(string text, string purpose = null)
        {
            byte[] data = Base64UrlTextEncoder.Decode(text);
            data = _dataProtector.Unprotect(data);
            var ticket = _ticketSerializer.Deserialize(data);

            var embeddedJwt = ticket.Properties?.GetTokenValue("jwt");

            try
            {
                new JwtSecurityTokenHandler()
                    .ValidateToken(embeddedJwt, _validationParameters, out var token);

                if (!(token is JwtSecurityToken jwt))
                {
                    return null;
                }
            }
            catch
            {
                return null;
            }

            return ticket;
        }

    }
}