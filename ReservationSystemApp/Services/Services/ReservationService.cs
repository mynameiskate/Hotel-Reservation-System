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
        private int _maxElapsedMinutes;

        public ReservationService(HotelDbContext dataContext, int pageSize, int maxPageSize, int maxElapsedMinutes)
        {
            _dataContext = dataContext;
            _pageSize = pageSize;
            _maxPageSize = maxPageSize;
            _maxElapsedMinutes = maxElapsedMinutes;
            _logger = AppLogging.LoggerFactory.CreateLogger<ReservationService>();
        }

        public async Task UpdateReservation(ReservationModel reservationModel) //DIVIDE 
        {
            var reservationEntity = await _dataContext.RoomReservations
                         .FirstOrDefaultAsync(r =>
                             (r.RoomReservationId == reservationModel.RoomReservationId) 
                             && !(reservationModel.Status == r.StatusId)
                         );

            if (reservationEntity == null)
            {
                throw new BookingException();
            }

            var userEntity = await _dataContext.Users
                         .FirstOrDefaultAsync(u => u.UserId == reservationEntity.UserId);

            if (userEntity == null || reservationEntity.UserId != userEntity.UserId)
            {
                throw new UserNotFoundException();
            }

            reservationEntity.StatusId = reservationModel.Status;

            if (reservationModel.Status == (int)ReservationStatusEnum.Confirmed)
            {
                var elapsedMinutes = (reservationModel.Confirmed - reservationModel.Created).TotalMinutes;

                if (elapsedMinutes > _maxElapsedMinutes)
                {
                    throw new TimeoutException();
                }

                reservationEntity.MoveInTime = reservationModel.MoveInTime;
                reservationEntity.TotalCost = reservationModel.TotalCost;

                if (reservationModel.Services?.Count > 0)
                {
                    foreach (ServiceModel service in reservationModel.Services)
                    {
                        var reservationService = new DataLayer.Entities.ReservationService
                        {
                            ReservationId = (int)reservationModel.RoomReservationId,
                            HotelServiceId = service.HotelServiceId
                        };

                        await _dataContext.ReservationServices.AddAsync(reservationService);
                    }
                }
            }

            _dataContext.RoomReservations.Update(reservationEntity);
            _dataContext.SaveChanges();
        }

        public async Task<ReservationModel> CreateReservation(string userEmail, ReservationModel reservationModel) 
        {
            if (reservationModel.MoveInDate == null || reservationModel.MoveOutDate == null)
            {
                throw new ArgumentException();
            }

            var roomEntity = await _dataContext.HotelRooms
                         .FirstOrDefaultAsync(r => r.HotelRoomId == reservationModel.HotelRoomId);
            var userEntity = await _dataContext.Users
                         .FirstOrDefaultAsync(u => u.Email == userEmail);

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
                StatusId = reservationModel.Status,
                UserId = userEntity.UserId,
                HotelRoomId = roomEntity.HotelRoomId,
                Created = reservationModel.Created,
                MoveInDate = reservationModel.MoveInDate,
                MoveOutDate = reservationModel.MoveOutDate,
                TotalCost = reservationModel.TotalCost
            };

            await _dataContext.RoomReservations.AddAsync(reservation);
            _dataContext.SaveChanges();

            return new ReservationModel(reservation);
        }
    }
}
