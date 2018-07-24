using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using React.AspNet;
using Microsoft.EntityFrameworkCore;
using DataLayer;
using Services.Services;
using Services.Interfaces;
using System;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.DataProtection;
using Services.JwtProvider;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace ReservationSystemApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddReact();

            string connection = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<DataContext>
                (options => options.UseSqlServer(connection));
            services.AddScoped<IHotelService>
                (provider => new Services.Services.HotelService(provider.GetRequiredService<DataContext>()));
            services.AddScoped<IAccountService>
                (provider => new AccountService(provider.GetRequiredService<DataContext>()));



            //Jwt authentication configuration
            var key = Encoding.ASCII.GetBytes(Configuration["secretKey"]);
            var validationParameters = new TokenValidationParameters
            {
                ClockSkew = TimeSpan.Zero,

                ValidateAudience = true,
                ValidAudience = Configuration["Jwt:audience"],

                ValidAudiences = new[] { Configuration["Jwt:audience"] },
                AudienceValidator = (IEnumerable<string> audiences, SecurityToken securityToken, TokenValidationParameters vp) =>
                    audiences.Any(a => a == vp.ValidAudience),

                ValidateIssuer = true,
                ValidIssuer = Configuration["Jwt:issuer"],

                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuerSigningKey = true,

                RequireExpirationTime = false,
                ValidateLifetime = false
            };

            var hostingEnvironment = services.BuildServiceProvider().GetService<IHostingEnvironment>();
            services.AddDataProtection(options =>
                options.ApplicationDiscriminator = hostingEnvironment.ApplicationName)
           .SetApplicationName(hostingEnvironment.ApplicationName);

            services.AddScoped<IDataSerializer<AuthenticationTicket>, TicketSerializer>();

            services.AddScoped<IJwtGenerator, JwtGenerator>(serviceProvider =>
                new JwtGenerator(new JwtOptions(validationParameters,
                                                Configuration["Jwt:tokenName"]))
            );

            //Cookie authentication configuration
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
            {
                options.SaveToken = true;
                options.TokenValidationParameters = validationParameters;
            })
           .AddCookie(options =>
           {
               options.Cookie.HttpOnly = true;
               options.Cookie.Expiration = TimeSpan.FromMinutes(30);
               options.SlidingExpiration = true;
               options.TicketDataFormat = new JwtAuthTicket(Configuration["Jwt:tokenName"], validationParameters,
               services.BuildServiceProvider().GetService<IDataSerializer<AuthenticationTicket>>(),
               services.BuildServiceProvider().GetDataProtector(new[]
               {
                     $"{hostingEnvironment.ApplicationName}-Auth1"
               }));

                //options.LoginPath = new PathString("/api/account/login");
                //options.LogoutPath = new PathString("/api/account/signout");
            });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("RequiresAdmin", policy => policy.RequireClaim("HasAdminRights"));
            });
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseAuthentication();
            app.UseMvc(routes =>
            {
                 routes.MapRoute(
                      name: "catch-all",
                      template: "{*url}",
                      defaults: new { controller = "Default", action = "Index" }

                  );
            });
        }
    }
}
