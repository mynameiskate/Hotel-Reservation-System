using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataLayer
{
    public class HotelDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Hotel> Hotels { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<HotelRoom> HotelRooms { get; set; }
        public DbSet<RoomReservation> Reservations { get; set; }
        public DbSet<ReservationStatus> ReservationStatuses { get; set; }

        public HotelDbContext(DbContextOptions options)
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

            modelBuilder.Entity<City>()
            .HasOne(c => c.Country)
            .WithMany();

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
