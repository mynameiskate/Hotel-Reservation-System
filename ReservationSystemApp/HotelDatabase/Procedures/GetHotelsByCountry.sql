CREATE PROCEDURE [dbo].[GetHotelsByCountry]
	@Country varchar(50)
AS
	SELECT * FROM HotelView 
	WHERE [CountryName] = @Country
GO