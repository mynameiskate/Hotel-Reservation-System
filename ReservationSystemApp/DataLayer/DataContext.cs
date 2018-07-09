using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace DatabaseRepositories
{
    public class DataContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Hotel> Hotels { get; set; }

        public DataContext(DbContextOptions options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Hotel>()
            .HasMany(h => h.Contacts)
            .WithOne();

            modelBuilder.Entity<Hotel>()
            .HasOne(h => h.Location)
            .WithOne();

            modelBuilder.Entity<Hotel>()
           .HasMany(h => h.Rooms)
           .WithOne(r => r.Hotel);

            modelBuilder.Entity<User>()
           .HasMany(u => u.BookingHistory)
           .WithOne(r => r.User);

            modelBuilder.Entity<RoomReservation>()
            .HasOne(r => r.HotelRoom)
            .WithMany()
            .HasForeignKey(r => r.HotelRoomId);

            modelBuilder.Entity<User>()
            .HasMany(u => u.Contacts)
            .WithOne();
        }
    }
}
