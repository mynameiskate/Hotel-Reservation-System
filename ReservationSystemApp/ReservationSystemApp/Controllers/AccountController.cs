using System.Threading.Tasks;
using DataLayer.Entities;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
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
        public async Task<IActionResult> Authenticate([FromBody] LoginModel user)
        {
            var loggedUser = await _accountService.Authenticate(user.Email, user.Password);
            if (loggedUser == null)
            {
                return BadRequest();
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
        public async Task<IActionResult> Register([FromBody] SignUpModel userModel)
        {

             User user = userModel.ConvertToUser();
             var signedUpUser = await _accountService.SignUp(user, userModel.Password);

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
        [HttpGet("profile")]
       // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAccountInfo()
        {
            var cookies = Request.Cookies;
            return Ok();
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