CREATE TABLE [dbo].[Images]
(
	[ImageId] INT NOT NULL PRIMARY KEY,
	HotelId int null FOREIGN KEY REFERENCES Hotels(HotelId),
	HotelRoomId int null FOREIGN KEY REFERENCES HotelRooms(HotelRoomId),
	FileName varbinary(MAX) NOT NULL
)
