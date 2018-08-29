/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/

INSERT INTO [dbo].[ReservationStatuses] VALUES 
(1, 'Pending'), (2, 'Confirmed'), (3, 'Paid'),
(4, 'Cancelled');

IF (EXISTS(SELECT * FROM [dbo].[RoomTypes]))
BEGIN
    DELETE FROM [dbo].[RoomTypes]
END

INSERT INTO [dbo].[RoomTypes] VALUES 
(1, 'Single'), (2, 'Double'), (3, 'Triple'),
(4, 'Quad'), (5, 'Queen'), (6, 'King'),
(7, 'Twin'), (8, 'Suite'), (9, 'Apartment'),
(10, 'PresidentSuite'), (11, 'ConnectingRooms');

IF (EXISTS(SELECT * FROM [dbo].[ContactTypes]))
BEGIN
    DELETE FROM [dbo].[ContactTypes]
END

INSERT INTO [dbo].[ContactTypes] VALUES 
(1, 'Email'), (2, 'Phone'), (3, 'Viber'),
(4, 'Skype'), (5, 'WhatsApp'), (6, 'Telegram'),
(7, 'Facebook'), (8, 'Instagram'), (9, 'Twitter'),
(10, 'LinkedIn'), (11, 'Snapchat'), (12, 'VK');

IF (EXISTS(SELECT * FROM [dbo].[Hotels]))
BEGIN
    DELETE FROM [dbo].[Hotels];
	DBCC CHECKIDENT ('[dbo].[Hotels]', RESEED, 0);
END

IF (EXISTS(SELECT * FROM [dbo].[Locations]))
BEGIN
    DELETE FROM [dbo].[Locations];
	DBCC CHECKIDENT ('[dbo].[Locations]', RESEED, 0);
END

IF (EXISTS(SELECT * FROM [dbo].[Cities]))
BEGIN
    DELETE FROM [dbo].[Cities];
	DBCC CHECKIDENT ('[dbo].[Cities]', RESEED, 0);
END

IF (EXISTS(SELECT * FROM [dbo].[Countries]))
BEGIN
    DELETE FROM [dbo].[Countries];
	DBCC CHECKIDENT ('[dbo].[Countries]', RESEED, 0);
END

IF (EXISTS(SELECT * FROM [dbo].[Users]))
BEGIN
    DELETE FROM [dbo].[Users];
	DBCC CHECKIDENT ('[dbo].[Users]', RESEED, 0);
END

INSERT INTO [dbo].[Countries] ([Name], CountryId)
VALUES ('Argentina', 'AR'), ('Armenia', 'AM'), ('Austria', 'AT'), ('Australia', 'AU'), ('Azerbaijan', 'AZ'), ('Belarus', 'BY'), ('Belgium', 'BE'),
		('Brazil', 'BR'), ('Bulgaria', 'BG'), ('Canada', 'CA'), ('China', 'CN'), ('Czech Republic', 'CZ'), ('Denmark', 'DK'), ('Ecuador', 'EC'), ('Egypt', 'EG'), 
		('Estonia', 'EE'), ('Finland', 'FI'), ('France', 'FR'), ('Georgia', 'GE'), ('Germany', 'DE'), ('Greece', 'GR'), ('Hungary', 'HU'), ('Iceland', 'IS'), 
		('India', 'IN'), ('Indonesia', 'ID'), ('Ireland', 'IE'), ('USA', 'US'), ('United Kingdom', 'UK');

INSERT INTO [dbo].[Cities] ([Name], CountryId) VALUES 
('NYC', (SELECT CountryId from [dbo].[Countries] WHERE Name='USA')),
('Boston', (SELECT CountryId from [dbo].[Countries] WHERE Name='USA')),
('Minsk', (SELECT CountryId from [dbo].[Countries] WHERE Name='Belarus')),
('Buenos Aires', (SELECT CountryId from [dbo].[Countries] WHERE Name='Argentina')),
('La Plata', (SELECT CountryId from [dbo].[Countries] WHERE Name='Argentina')),
('Dublin', (SELECT CountryId from [dbo].[Countries] WHERE Name='Ireland')),
('Reykjavík', (SELECT CountryId from [dbo].[Countries] WHERE Name='Iceland')),
('Berlin', (SELECT CountryId from [dbo].[Countries] WHERE Name='Germany')),
('Garðabær', (SELECT CountryId from [dbo].[Countries] WHERE Name='Iceland')),
('Paris', (SELECT CountryId from [dbo].[Countries] WHERE Name='France')),
('Tallinn', (SELECT CountryId from [dbo].[Countries] WHERE Name='Estonia')),
('Prague', (SELECT CountryId from [dbo].[Countries] WHERE Name='Czech Republic')),
('London', (SELECT CountryId from [dbo].[Countries] WHERE Name='United Kingdom'));

INSERT INTO [dbo].[Locations] ([Address], CityId) VALUES 
('768 5th Ave, New York, NY 10019, USA', (SELECT CityId from [dbo].[Cities] WHERE Name='NYC')),
('Piccadilly, Westminster, London, W1J 7BX United Kingdom', (SELECT CityId from [dbo].[Cities] WHERE Name='London')),
('Nautholsvegur 52, Midborg, Reykjavík, Iceland', (SELECT CityId from [dbo].[Cities] WHERE Name='Reykjavík'));

INSERT INTO [dbo].[Hotels] ([Name], Stars, LocationId) VALUES 
('The plaza', 5, (SELECT LocationId from [dbo].[Locations] WHERE Address='768 5th Ave, New York, NY 10019, USA')),
('Icelandair Hotel Reykjavik Natura', 4, (SELECT LocationId from [dbo].[Locations] WHERE Address='Nautholsvegur 52, Midborg, Reykjavík, Iceland')),
('The Park Lane Hotel', 5, (SELECT LocationId from [dbo].[Locations] WHERE Address='Piccadilly, Westminster, London, W1J 7BX United Kingdom'));

INSERT [dbo].[Users] ([Email], [PasswordHash], [PasswordSalt], [IsAdmin], [ShortName], [FullName]) 
VALUES (N'admin', 0x0C0045EFF446019FC69DEE87317A73E6EC6FA71DEB0573BDD0DF0D9F0A14D4BF, 0xBFBCE3B550313F874CF56FC5BB373251A3C286EBA061C2E607DC4DE3BB02742F, 1, N'admin', N'admin');

INSERT [dbo].[Users] ([Email], [PasswordHash], [PasswordSalt], [IsAdmin], [ShortName], [FullName])
VALUES (N'guest', 0xE5B917B4911BCDBC0C426E3450AE8227A64D3D60E67D095B7A3E31FB33D66497, 0x93BB45DE7FA54F7DD0DB42FD1FAB41CFD003F69729F029B4F9B28024B97DFF51, 0, N'guest', N'guest')

INSERT [dbo].[HotelRooms] ([Number], [IsAvailable], [Cost], [Size], [Adults], [HotelId], [RoomTypeId]) VALUES (1, 1, 30, 40, 2, 1, NULL)
INSERT [dbo].[HotelRooms] ([Number], [IsAvailable], [Cost], [Size], [Adults], [HotelId], [RoomTypeId]) VALUES (2, 1, 15, 50, 2, 1, NULL)
INSERT [dbo].[HotelRooms] ([Number], [IsAvailable], [Cost], [Size], [Adults], [HotelId], [RoomTypeId]) VALUES (1, 1, 10, 30, 1, 2, NULL)
INSERT [dbo].[HotelRooms] ([Number], [IsAvailable], [Cost], [Size], [Adults], [HotelId], [RoomTypeId]) VALUES (10, 1, 40, 40, 1, 3, NULL)
INSERT [dbo].[HotelRooms] ([Number], [IsAvailable], [Cost], [Size], [Adults], [HotelId], [RoomTypeId]) VALUES (1, 1, 20, 20, 2, 2, NULL)

SET IDENTITY_INSERT [dbo].[Services] ON
	INSERT [dbo].[Services] ([ServiceId], [Name]) VALUES (1, N'Breakfasts included')
	INSERT [dbo].[Services] ([ServiceId], [Name]) VALUES (2, N'Newspaper delivery')
	INSERT [dbo].[Services] ([ServiceId], [Name]) VALUES (3, N'Spa')
	INSERT [dbo].[Services] ([ServiceId], [Name]) VALUES (4, N'Car rent')
SET IDENTITY_INSERT [dbo].[Services] OFF

INSERT [dbo].[HotelServices] ([Cost], [ServiceId], [HotelId], [IsRemoved]) VALUES 
(20, 1, (SELECT HotelId from [dbo].[Hotels] WHERE Name='The plaza'), 0)
INSERT [dbo].[HotelServices] ([Cost], [ServiceId], [HotelId], [IsRemoved]) VALUES
(30, 2, (SELECT HotelId from [dbo].[Hotels] WHERE Name='Park lane hotel'), 0)
INSERT [dbo].[HotelServices] ([Cost], [ServiceId], [HotelId], [IsRemoved]) 
VALUES (30, 2, (SELECT HotelId from [dbo].[Hotels] WHERE Name='The plaza'), 0)