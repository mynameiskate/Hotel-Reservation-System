CREATE TABLE [dbo].[HotelServices]
(
	HotelServiceId INT NOT NULL IDENTITY PRIMARY KEY,
	Cost float NULL,
	ServiceId int FOREIGN KEY REFERENCES Services(ServiceId),
	HotelId int FOREIGN KEY REFERENCES Hotels(HotelId)
)
