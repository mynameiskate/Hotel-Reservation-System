CREATE TABLE [dbo].[Cities]
(
	CityId INT NOT NULL PRIMARY KEY,
	[Name] varchar (40) not null,
	CountryId int FOREIGN KEY REFERENCES Countries(CountryId)
)
