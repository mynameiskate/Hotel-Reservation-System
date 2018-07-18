CREATE TABLE [dbo].[Hotels]
(
	HotelId INT NOT NULL IDENTITY PRIMARY KEY,
	[Name] NVARCHAR (100) NULL,
	INDEX idx_HotelName ([Name]),
	Stars int NULL,
	IsRemoved bit DEFAULT 0,
	LocationId int FOREIGN KEY REFERENCES Locations(LocationId) NULL
)
