CREATE TABLE [dbo].[HotelRooms]
(
	HotelRoomId INT NOT NULL IDENTITY PRIMARY KEY,
	Number int not null,
	IsAvailable bit DEFAULT 1 NOT NULL,
	Cost FLOAT NULL,
	Size FLOAT NULL,
	Adults int,
	HotelId int FOREIGN KEY REFERENCES Hotels(HotelId) NOT NULL,
	RoomTypeId int FOREIGN KEY REFERENCES RoomTypes(RoomTypeId)
)
