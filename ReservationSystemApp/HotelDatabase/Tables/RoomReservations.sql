CREATE TABLE [dbo].[RoomReservations]
(
	[RoomReservationId] int not null IDENTITY PRIMARY KEY,
	[Created] datetimeoffset not null,
	MoveInDate date,
	MoveOutDate date,
	TotalCost FLOAT,
	MoveInTime time(7),
	GuestName nvarchar(MAX),
	StatusId int REFERENCES ReservationStatuses(StatusId) NOT NULL,
	UserId int	FOREIGN KEY REFERENCES Users(UserId),
	HotelRoomId int FOREIGN KEY REFERENCES HotelRooms(HotelRoomId)
)