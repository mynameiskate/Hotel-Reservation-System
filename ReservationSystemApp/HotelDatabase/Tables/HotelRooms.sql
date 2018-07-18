CREATE TABLE [dbo].[HotelRooms]
(
	HotelRoomId INT NOT NULL PRIMARY KEY,
	Number int not null,
	IsAvailable bit DEFAULT 1 NOT NULL,
	Cost float NULL,
	Size float NULL,
	CanPlace int,
	HotelId int FOREIGN KEY REFERENCES Hotels(HotelId),
	RoomTypeId int FOREIGN KEY REFERENCES RoomTypes(RoomTypeId)
)
