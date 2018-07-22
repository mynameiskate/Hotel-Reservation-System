using System.Threading.Tasks;
using DataLayer.Entities;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Services.Interfaces;
using Services.Models;

namespace ReservationSystemApp.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private IConfiguration _configuration;
        private readonly IAccountService _accountService;
        private IJwtGenerator _jwtGenerator;

        public AccountController(IConfiguration configuration,
                                 IAccountService accountService,
                                 IJwtGenerator jwtGenerator)
        {
            _configuration = configuration;
            _accountService = accountService;
            _jwtGenerator = jwtGenerator;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Authenticate([FromBody] string email, string password)
        {
            var loggedUser = await _accountService.Authenticate(email, password);
            if (loggedUser == null)
            {
                return Forbid();
            }
            else
            {
                var token = _jwtGenerator.GenerateTokenContext(loggedUser);
                await HttpContext.SignInAsync(token.ClaimsPrincipal, token.AuthProperties);
                return Ok();
            }              
        }

        [AllowAnonymous]
        [HttpPost("signup")]
        public async Task<IActionResult> Register([FromBody] UserModel userModel, string password)
        {
            User user = userModel.ConvertToUser();
            var signedUpUser = await _accountService.SignUp(user, password);

            if (signedUpUser == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok();
            }
            
        }

        [Authorize]
        [HttpPost("signout")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SignOut()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok();
        }
    }
}