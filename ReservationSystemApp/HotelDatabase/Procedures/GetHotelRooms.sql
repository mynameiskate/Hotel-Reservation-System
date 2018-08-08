﻿CREATE PROCEDURE [dbo].[GetHotelRooms]
	@HotelId int
AS
	SELECT HotelRoomId,
		   Number,
		   IsAvailable,
		   Cost,
		   Size,
		   Adults,
		   RoomType
	FROM HotelRoomView
	WHERE (@HotelId = HotelRoomView.HotelId)
		AND (HotelRoomView.IsAvailable = 1)
GO
