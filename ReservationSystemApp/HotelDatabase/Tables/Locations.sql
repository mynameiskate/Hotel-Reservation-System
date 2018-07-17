CREATE TABLE [dbo].[Locations]
(
	LocationId INT NOT NULL PRIMARY KEY,
	[Address] nvarchar not null,
	CityId int FOREIGN KEY REFERENCES Cities(CityId)
)
