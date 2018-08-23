﻿CREATE TABLE [dbo].[HotelImages]
(
	[HotelImageId] INT NOT NULL IDENTITY PRIMARY KEY,
	[HotelId] int FOREIGN KEY REFERENCES Hotels(HotelId) NOT NULL,
	[ImageId] int FOREIGN KEY REFERENCES Images(ImageId) NOT NULL
)
