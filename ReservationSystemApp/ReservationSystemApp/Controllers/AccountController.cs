using System;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DataLayer.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Services.Interfaces;
using Services.Models;
using Services.Helpers;
using System.IdentityModel.Tokens.Jwt;

namespace ReservationSystemApp.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private IConfiguration _configuration;
        private readonly IAccountService _accountService;

        public AccountController(IConfiguration configuration,
                                 IAccountService accountService)
        {
            _configuration = configuration;
            _accountService = accountService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Authenticate([FromBody] string email, string password)
        {
            var loggedUser = await _accountService.Authenticate(email, password);
            if (loggedUser == null) return NotFound();  //Note: WIP
            else return Ok(GenerateToken(loggedUser));
        }

        [HttpPost("create")]
        public async Task<IActionResult> Register([FromBody] UserModel userModel, string password)
        {
            User user = userModel.ConvertToUser();
            var signedUpUser = await _accountService.SignUp(user, password);

            if (signedUpUser == null) return BadRequest();
            else return Ok();
            
        }

        private string GenerateToken(User user)
        {
            byte[] key = Encoding.ASCII.GetBytes(_configuration["secretKey"]);
            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.IsAdmin ? 
                                               "Administrator"
                                               : "Guest")
                }),
                Expires = DateTime.UtcNow.AddDays(10),
                SigningCredentials = credentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}