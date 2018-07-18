CREATE PROCEDURE [dbo].[GetHotel]
	@HotelId int
AS
	SELECT * FROM HotelView 
	WHERE HotelId = @HotelId
GO
