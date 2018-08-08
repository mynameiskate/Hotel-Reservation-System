CREATE PROCEDURE [dbo].[GetBookingHistory]
	@UserId int
AS
	SELECT RoomReservationId,
		   ReservationTime,
		   MoveInDate,
		   MoveOutDate,
		   UserId,
		   HotelId,
		   Cost,
		   [Name]
	    FROM BookingView
		WHERE @UserId = UserId;
GO

