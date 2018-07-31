using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using DataLayer.Entities;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Services.Interfaces;
using Services.Models;

namespace ReservationSystemApp.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ILogger<HotelController> _logger;
        private IConfiguration _configuration;
        private readonly IAccountService _accountService;
        private IJwtGenerator _jwtGenerator;

        public AccountController(ILogger<HotelController> logger,
                                 IConfiguration configuration,
                                 IAccountService accountService,
                                 IJwtGenerator jwtGenerator)
        {
            _logger = logger;
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
                var token = _jwtGenerator.GenerateAccessToken(loggedUser);
                return Ok(new { token });
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
        public async Task<IActionResult> GetAccountInfo()
        {
            try
            {
                string email = HttpContext.User.FindFirst(ClaimTypes.Email).Value;
                var user = await _accountService.GetProfileInfo(email);

                if (user != null)
                {
                    return Ok(user);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch
            {
                return BadRequest();
            }
        }

        [Authorize]
        [HttpPost("signout")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SignOut()
        {
            await HttpContext.SignOutAsync(JwtBearerDefaults.AuthenticationScheme);
            return Ok();
        }
    }
}