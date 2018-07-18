CREATE TABLE [dbo].[HotelServices]
(
	HotelServiceId INT NOT NULL PRIMARY KEY,
	[Name] nvarchar null,
	Cost float NULL,
	HotelId int FOREIGN KEY REFERENCES Hotels(HotelId)
)
