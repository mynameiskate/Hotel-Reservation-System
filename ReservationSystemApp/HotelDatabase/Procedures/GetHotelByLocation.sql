CREATE PROCEDURE [dbo].[GetHotelByLocation]
	@City varchar(50) = null,
	@Country varchar(50) = null
AS
	IF (@Country IS null)
	BEGIN
		SELECT * FROM HotelView
		WHERE @City = HotelView.CityName
	END
	ELSE IF (@City IS null) 
	BEGIN
		EXEC GetHotelByLocation;
	END
	ELSE BEGIN
		SELECT * FROM HotelView 
		WHERE (@City = HotelView.CityName)
			  AND (@Country = HotelView.CountryName)
	END
GO
