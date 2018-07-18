CREATE PROCEDURE [dbo].[GetHotelRooms]
	@HotelId int
AS
	SELECT * FROM HotelRoomView
	WHERE (@HotelId = HotelRoomView.HotelId)
		AND (HotelRoomView.IsAvailable = 1)
RETURN 0
