CREATE VIEW [dbo].[BookingView]
	AS SELECT RoomReservationId,
			  ReservationTime,
			  MoveInTime,
			  MoveOutTime,
			  UserId,
			  room.HotelId,
			  room.Cost,
			  Hotels.[Name]
	   FROM [RoomReservations]
	   FULL OUTER JOIN HotelRoomView room
	       ON room.HotelId = HotelId
	   FULL OUTER JOIN Hotels
		   ON room.HotelId = Hotels.HotelId