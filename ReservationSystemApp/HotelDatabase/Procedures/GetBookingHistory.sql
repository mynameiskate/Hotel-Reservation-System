CREATE PROCEDURE [dbo].[GetBookingHistory]
	@UserId int
AS
	SELECT RoomReservationId,
		   ReservationTime,
		   MoveInTime,
		   MoveOutTime,
		   UserId,
		   HotelId,
		   Cost,
		   [Name]
	    FROM BookingView
		WHERE @UserId = UserId;
GO

