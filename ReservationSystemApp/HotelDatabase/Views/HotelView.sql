CREATE VIEW [dbo].[HotelView]
	AS SELECT Hotels.HotelId, 
			  Hotels.IsRemoved, 
			  Hotels.[Name], 
			  Hotels.Stars,
			  LocationView.Address,
			  LocationView.CityName,
			  LocationView.CountryName
	FROM Hotels
	FULL OUTER JOIN LocationView 
		ON Hotels.LocationId = LocationView.LocationId;
	