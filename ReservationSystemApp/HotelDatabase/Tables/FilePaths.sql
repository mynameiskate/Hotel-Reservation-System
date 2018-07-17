﻿CREATE TABLE [dbo].[FilePaths]
(
	FilePathId INT NOT NULL PRIMARY KEY,
	Path nvarchar,
	HotelId int FOREIGN KEY REFERENCES Hotels(HotelId),
	HotelRoomId int FOREIGN KEY REFERENCES HotelRooms(HotelRoomId)
)