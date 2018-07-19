CREATE TABLE [dbo].[Hotels]
(
	HotelId INT NOT NULL IDENTITY PRIMARY KEY,
	[Name] NVARCHAR (100) NULL,
	INDEX idx_HotelName ([Name]),
	Stars int NULL,
<<<<<<< HEAD
	IsRemoved bit,
=======
	IsRemoved bit DEFAULT 0,
>>>>>>> 5ffff4d8bba6e5ef7e7bc559b9c9304c442ad976
	LocationId int FOREIGN KEY REFERENCES Locations(LocationId) NULL
)
