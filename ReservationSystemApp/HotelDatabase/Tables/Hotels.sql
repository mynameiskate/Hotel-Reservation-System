CREATE TABLE [dbo].[Hotels]
(
	HotelId INT NOT NULL PRIMARY KEY,
	[Name] varchar(20) not null,
	Stars varbinary(1),
	IsRemoved bit,
	LocationId int FOREIGN KEY REFERENCES Locations(LocationId)
)
