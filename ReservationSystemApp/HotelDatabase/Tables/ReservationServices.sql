CREATE TABLE [dbo].[ReservationServices]
(
    ReservationServiceId INT NOT NULL IDENTITY PRIMARY KEY,
	HotelServiceId INT CONSTRAINT FK_Hotel_Service_Id NOT NULL FOREIGN KEY REFERENCES HotelServices(HotelServiceId),
	ReservationId INT NOT NULL CONSTRAINT FK_Res_Service_Id FOREIGN KEY REFERENCES RoomReservations(RoomReservationId)
)
