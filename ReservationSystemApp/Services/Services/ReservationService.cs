using DataLayer;
using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ReservationSystemApp.Services;
using Services.Exceptions;
using Services.Interfaces;
using Services.Models;
using System;
using System.Threading.Tasks;

namespace Services.Services
{
    public class ReservationService : IReservationService
    {
        private readonly ILogger _logger;
        private HotelDbContext _dataContext;
        private int _pageSize;
        private int _maxPageSize;

        public ReservationService(HotelDbContext dataContext, int pageSize, int maxPageSize)
        {
            _dataContext = dataContext;
            _pageSize = pageSize;
            _maxPageSize = maxPageSize;
            _logger = AppLogging.LoggerFactory.CreateLogger<AccountService>();
        }

        public async Task<ReservationModel> Book(string userEmail, ReservationModel reservationModel)
        {
            if (reservationModel.MoveInDate == null || reservationModel.MoveOutDate == null)
            {
                throw new ArgumentException();
            }

            var roomEntity = await _dataContext.HotelRooms
                         .FirstOrDefaultAsync(r => r.HotelRoomId == reservationModel.HotelRoomId);
            var userEntity = await _dataContext.Users
                         .FirstOrDefaultAsync(u => u.Email == userEmail);

            var status = await _dataContext.ReservationStatuses
                        .FirstOrDefaultAsync(s => s.Status == reservationModel.Status);

            if (userEntity == null)
            {
                throw new UserNotFoundException();
            }

            if (roomEntity == null)
            {
                throw new BookingException();
            }

            var reservation = new RoomReservation
            {
                StatusId = status.ReservationStatusId,
                UserId = userEntity.UserId,
                HotelRoomId = roomEntity.HotelRoomId,
                Created = reservationModel.Created,
                MoveInDate = reservationModel.MoveInDate,
                MoveOutDate = reservationModel.MoveOutDate
            };

            await _dataContext.Reservations.AddAsync(reservation);
            _dataContext.SaveChanges();

            return new ReservationModel(reservation);
        }
    }
}
