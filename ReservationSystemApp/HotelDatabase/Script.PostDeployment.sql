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

IF (EXISTS(SELECT * FROM [dbo].[ReservationStatuses]))
BEGIN
    DELETE FROM [dbo].[ReservationStatuses]
END

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