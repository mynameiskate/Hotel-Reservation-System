CREATE TABLE [dbo].[RoomReservations]
(
	[RoomReservationId] int not null IDENTITY PRIMARY KEY,
	[Created] datetimeoffset not null,
	MoveInDate date,
	MoveOutDate date,
	TotalCost FLOAT,
	MoveInTime time(7),
	GuestName nvarchar(MAX),
	StatusId int CONSTRAINT FK_StatusId FOREIGN KEY REFERENCES ReservationStatuses(StatusId) NOT NULL,
	UserId int CONSTRAINT FK_UserId FOREIGN KEY REFERENCES Users(UserId),
	HotelRoomId int CONSTRAINT FK_Room_Id FOREIGN KEY REFERENCES HotelRooms(HotelRoomId)
)