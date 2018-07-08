using DatabaseRepositories.Repositories;
using DatabaseRepositories.ContextFactories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using React.AspNet;

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

            services.AddScoped<IDataContextFactory, SqlDataContextFactory>();

            string connection = Configuration.GetConnectionString("DefaultConnection");
            services.AddScoped<HotelRepository>(provider => new HotelRepository(connection, provider.GetService<IDataContextFactory>()));
            //services.AddDbContext<DataContext>(options => options.UseSqlServer(connection));
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(); 
            }
            else
            {
                app.UseHsts();
            }

            app.UseStaticFiles();
            app.UseHttpsRedirection();
            app.UseMvc(/*routes =>
            {
                routes.MapRoute(
                    name: "DefaultApi",
                    template: "api/{controller}/{action}");
                routes.MapSpaFallbackRoute("spa-fallback", new { controller = "Home", action = "Index" }); 
            }*/);
        }
    }
}
