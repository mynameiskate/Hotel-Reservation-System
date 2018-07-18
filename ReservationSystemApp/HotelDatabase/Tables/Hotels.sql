CREATE TABLE [dbo].[Hotels]
(
	HotelId INT NOT NULL PRIMARY KEY,
	[Name]   NVARCHAR (MAX) NULL,
	INDEX idx_HotelName ([Name]),
	Stars varbinary(1) NULL,
	IsRemoved bit,
	LocationId int FOREIGN KEY REFERENCES Locations(LocationId) NULL
)
