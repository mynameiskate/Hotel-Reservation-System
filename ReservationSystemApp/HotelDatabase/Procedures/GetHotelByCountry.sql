CREATE PROCEDURE [dbo].[GetHotelByCountry]
	@Country varchar(50)
AS
	SELECT HotelId, 
		   IsRemoved, 
		   [Name], 
		   Stars,
		   Address,
		   CityName
	FROM HotelView 
	WHERE [CountryName] = @Country
GO