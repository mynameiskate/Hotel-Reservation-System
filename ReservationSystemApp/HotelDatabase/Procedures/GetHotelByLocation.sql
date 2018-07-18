CREATE PROCEDURE [dbo].[GetHotelByLocation]
	@City varchar(50) = null,
	@Country varchar(50) = null
AS
	IF (@Country IS null)
	BEGIN
		SELECT HotelId, 
			   IsRemoved, 
			   [Name], 
			   Stars,
			   Address,
			   CityName
	    FROM HotelView
		WHERE @City = HotelView.CityName
	END
	ELSE IF (@City IS null) 
	BEGIN
		EXEC GetHotelByCountry;
	END
	ELSE BEGIN
		SELECT HotelId, 
			   IsRemoved, 
			   [Name], 
			   Stars,
			   Address,
			   CityName,
			   CountryName
		FROM HotelView 
		WHERE (@City = HotelView.CityName)
			  AND (@Country = HotelView.CountryName)
	END
GO
