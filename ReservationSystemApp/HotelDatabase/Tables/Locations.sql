CREATE TABLE [dbo].[Locations]
(
	LocationId INT NOT NULL IDENTITY PRIMARY KEY,
	[Address] nvarchar(MAX) not null,
	CityId int FOREIGN KEY REFERENCES Cities(CityId)
)
