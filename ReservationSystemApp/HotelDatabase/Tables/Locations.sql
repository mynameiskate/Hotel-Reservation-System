CREATE TABLE [dbo].[Locations]
(
	LocationId INT NOT NULL IDENTITY PRIMARY KEY,
<<<<<<< HEAD
	[Address] nvarchar not null,
=======
	[Address] nvarchar(MAX) not null,
>>>>>>> 5ffff4d8bba6e5ef7e7bc559b9c9304c442ad976
	CityId int FOREIGN KEY REFERENCES Cities(CityId)
)
