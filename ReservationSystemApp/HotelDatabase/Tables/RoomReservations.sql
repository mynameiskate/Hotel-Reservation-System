CREATE TABLE [dbo].[RoomReservations]
(
	[RoomReservationId] int not null IDENTITY PRIMARY KEY,
	ReservationTime datetimeoffset not null,
	MoveInDate date,
	MoveOutDate date,
	TotalCost FLOAT,
	StatusId int REFERENCES ReservationStatuses(StatusId) NOT NULL,
	UserId int	FOREIGN KEY REFERENCES Users(UserId),
	HotelRoomId int FOREIGN KEY REFERENCES HotelRooms(HotelRoomId)
)