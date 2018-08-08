CREATE VIEW [dbo].[HotelRoomView]
	AS SELECT HotelRoomId,
			  Number,
			  IsAvailable,
			  Cost,
			  Size,
			  Adults,
			  HotelId,
			  RoomTypes.RoomType
	FROM [HotelRooms]
	FULL OUTER JOIN RoomTypes
		ON HotelRooms.RoomTypeId = RoomTypes.RoomTypeId;

