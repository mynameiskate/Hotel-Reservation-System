CREATE TABLE [dbo].[Locations]
(
	LocationId INT NOT NULL IDENTITY PRIMARY KEY,
	[Address] nvarchar(MAX) not null,
	CityId int CONSTRAINT FK_City_Location_Id FOREIGN KEY REFERENCES Cities(CityId)
)