using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataLayer
{
    class DataContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Hotel> Hotels { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Hotel>()
            .HasMany(h => h.Contacts)
            .WithOne();

            modelBuilder.Entity<Hotel>()
            .HasOne(h => h.Location)
            .WithMany();

            modelBuilder.Entity<HotelRoom>()
            .HasOne(hr => hr.Hotel)
            .WithMany(h => h.Rooms)
            .HasForeignKey(hr => hr.HotelId);
           /* modelBuilder.Entity<Hotel>()
           .HasMany(h => h.Rooms)
           .WithOne(r => r.Hotel);*/

            modelBuilder.Entity<User>()
           .HasMany(u => u.BookingHistory)
           .WithOne(r => r.User);

            modelBuilder.Entity<User>()
            .HasMany(u => u.Contacts)
            .WithOne();

            modelBuilder.Entity<User>()
            .HasOne(u => u.Role)
            .WithOne();
        }
    }
}
