CREATE TABLE [dbo].[Cities]
(
	CityId INT NOT NULL PRIMARY KEY,
	Name varchar (40) not null,
	INDEX idx_CityName ([Name]),
	ContryId int FOREIGN KEY REFERENCES Countries(CountryId)
)
