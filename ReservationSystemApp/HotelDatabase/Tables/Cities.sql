CREATE TABLE [dbo].[Cities]
(
	CityId INT NOT NULL IDENTITY PRIMARY KEY,
	Name varchar (40) not null,
	INDEX idx_CityName ([Name]),
	CountryId int FOREIGN KEY REFERENCES Countries(CountryId)
)
