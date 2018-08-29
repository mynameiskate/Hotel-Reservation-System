CREATE TABLE [dbo].[HotelRooms]
(
	HotelRoomId INT NOT NULL IDENTITY PRIMARY KEY,
	Number int not null,
	IsAvailable bit DEFAULT 1 NOT NULL,
	Cost FLOAT NULL,
	Size FLOAT NULL,
	Adults int,
	HotelId int CONSTRAINT FK_Hotel_Id FOREIGN KEY REFERENCES Hotels(HotelId) NOT NULL,
	RoomTypeId int CONSTRAINT FK_Room_Type_Id FOREIGN KEY REFERENCES RoomTypes(RoomTypeId)
)
