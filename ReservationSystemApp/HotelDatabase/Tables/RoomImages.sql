CREATE TABLE [dbo].[RoomImages]
(
	[RoomImageId] INT NOT NULL IDENTITY PRIMARY KEY,
	[HotelRoomId] int FOREIGN KEY REFERENCES HotelRooms(HotelRoomId) NOT NULL,
	[ImageId] int FOREIGN KEY REFERENCES Images(ImageId) NOT NULL
)