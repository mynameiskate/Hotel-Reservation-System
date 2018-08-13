CREATE TABLE [dbo].[ReservationServices]
(
    ReservationServiceId INT NOT NULL IDENTITY PRIMARY KEY,
	HotelServiceId INT NOT NULL REFERENCES HotelServices(HotelServiceId),
	ReservationId INT NOT NULL FOREIGN KEY REFERENCES RoomReservations(RoomReservationId)
)
