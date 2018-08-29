CREATE TABLE [dbo].[Cities]
(
	CityId INT NOT NULL IDENTITY PRIMARY KEY,
	Name varchar (40) not null,
	INDEX idx_CityName ([Name]),
	CountryId nvarchar(3) NOT NULL CONSTRAINT FK_Country_Id FOREIGN KEY REFERENCES Countries(CountryId)
)
