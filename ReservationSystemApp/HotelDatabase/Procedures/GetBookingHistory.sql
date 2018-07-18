CREATE PROCEDURE [dbo].[GetBookingHistory]
	@UserId int
AS
	SELECT * FROM BookingView
		WHERE @UserId = UserId;
GO
