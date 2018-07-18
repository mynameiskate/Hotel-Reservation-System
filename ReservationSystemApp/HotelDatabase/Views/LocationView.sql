CREATE VIEW [dbo].[LocationView]
	AS SELECT LocationId, 
			  [Address], 
			  city.[Name] as CityName, 
			  country.[Name] as CountryName
	FROM [Locations] 
	FULL OUTER JOIN Cities city
		ON city.CityId = Locations.CityId 
	FULL OUTER JOIN Countries country
		ON city.ContryId = country.CountryId
