CREATE TABLE [dbo].[HotelServices]
(
	HotelServiceId INT NOT NULL IDENTITY PRIMARY KEY,
	Cost float NULL,
	ServiceId int CONSTRAINT FK_Service_Id FOREIGN KEY REFERENCES Services(ServiceId),
	HotelId int CONSTRAINT FK_Service_Hotel_Id FOREIGN KEY REFERENCES Hotels(HotelId),
	IsRemoved bit DEFAULT 0 NOT NULL
)
