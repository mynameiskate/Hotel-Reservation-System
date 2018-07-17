CREATE TABLE [dbo].[HotelServices]
(
	HotelServiceId INT NOT NULL PRIMARY KEY,
	[Name] nvarchar not null,
	Cost float,
	HotelId int FOREIGN KEY REFERENCES Hotels(HotelId)
)
