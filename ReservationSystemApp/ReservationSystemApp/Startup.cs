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
using System.Security.Claims;

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
            services.AddScoped<IHotelPageService>
               (provider => new HotelPageService(provider.GetRequiredService<DataContext>(),
                                                 Convert.ToInt32(Configuration["pages:size"])));

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

                RequireExpirationTime = true,
                ValidateLifetime = true
            };

            var hostingEnvironment = services.BuildServiceProvider().GetService<IHostingEnvironment>();
            services.AddDataProtection(options =>
                options.ApplicationDiscriminator = hostingEnvironment.ApplicationName)
           .SetApplicationName(hostingEnvironment.ApplicationName);


            services.AddScoped<IJwtGenerator, JwtGenerator>(serviceProvider =>
                new JwtGenerator(new JwtOptions(validationParameters,
                                                Configuration["Jwt:tokenName"]))
            );

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
            {
                options.SaveToken = true;
                options.TokenValidationParameters = validationParameters;
            });
            services.AddAuthorization(options =>
            {
                options.AddPolicy("AdminOnly", policy =>
                                  policy.RequireClaim(ClaimTypes.Role, "Administrator"));
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
