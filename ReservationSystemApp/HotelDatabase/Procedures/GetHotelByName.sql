CREATE PROCEDURE [dbo].[GetHotelByName]
	@Name nvarchar(MAX)
AS
	SELECT * FROM HotelView 
	WHERE @Name = HotelView.Name
GO
