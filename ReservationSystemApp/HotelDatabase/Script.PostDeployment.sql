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

IF (EXISTS(SELECT * FROM [dbo].[RoomTypes]))
BEGIN
    DELETE FROM [dbo].[RoomTypes]
END

<<<<<<< HEAD
INSERT INTO [dbo].[RoomTypes] VALUES (1, 'Single');
INSERT INTO [dbo].[RoomTypes] VALUES (2, 'Double');
INSERT INTO [dbo].[RoomTypes] VALUES (3, 'Triple');
INSERT INTO [dbo].[RoomTypes] VALUES (4, 'Quad');
INSERT INTO [dbo].[RoomTypes] VALUES (5, 'Queen');
INSERT INTO [dbo].[RoomTypes] VALUES (6, 'King');
INSERT INTO [dbo].[RoomTypes] VALUES (7, 'Twin');
INSERT INTO [dbo].[RoomTypes] VALUES (8, 'Suite');
INSERT INTO [dbo].[RoomTypes] VALUES (9, 'Apartment');
INSERT INTO [dbo].[RoomTypes] VALUES (10, 'PresidentSuite');
INSERT INTO [dbo].[RoomTypes] VALUES (11, 'ConnectingRooms');
=======
INSERT INTO [dbo].[RoomTypes] VALUES 
(1, 'Single'), (2, 'Double'), (3, 'Triple'),
(4, 'Quad'), (5, 'Queen'), (6, 'King'),
(7, 'Twin'), (8, 'Suite'), (9, 'Apartment'),
(10, 'PresidentSuite'), (11, 'ConnectingRooms');
>>>>>>> 5ffff4d8bba6e5ef7e7bc559b9c9304c442ad976

IF (EXISTS(SELECT * FROM [dbo].[ContactTypes]))
BEGIN
    DELETE FROM [dbo].[ContactTypes]
END

<<<<<<< HEAD
INSERT INTO [dbo].[ContactTypes] VALUES (1, 'Email');
INSERT INTO [dbo].[ContactTypes] VALUES (2, 'Phone');
INSERT INTO [dbo].[ContactTypes] VALUES (3, 'Viber');
INSERT INTO [dbo].[ContactTypes] VALUES (4, 'Skype');
INSERT INTO [dbo].[ContactTypes] VALUES (5, 'WhatsApp');
INSERT INTO [dbo].[ContactTypes] VALUES (6, 'Telegram');
INSERT INTO [dbo].[ContactTypes] VALUES (7, 'Facebook');
INSERT INTO [dbo].[ContactTypes] VALUES (8, 'Instagram');
INSERT INTO [dbo].[ContactTypes] VALUES (9, 'Twitter');
INSERT INTO [dbo].[ContactTypes] VALUES (10, 'LinkedIn');
INSERT INTO [dbo].[ContactTypes] VALUES (11, 'Snapchat');
INSERT INTO [dbo].[ContactTypes] VALUES (12, 'VK');

IF (EXISTS(SELECT * FROM [dbo].[Cities]))
BEGIN
    DELETE FROM [dbo].[Countries];
=======
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
>>>>>>> 5ffff4d8bba6e5ef7e7bc559b9c9304c442ad976
	DBCC CHECKIDENT ('[dbo].[Cities]', RESEED, 0);
END

IF (EXISTS(SELECT * FROM [dbo].[Countries]))
BEGIN
    DELETE FROM [dbo].[Countries];
	DBCC CHECKIDENT ('[dbo].[Countries]', RESEED, 0);
END

<<<<<<< HEAD
INSERT INTO [dbo].[Countries] ([Name]) 
VALUES ('Argentina', 'Armenia', 'Austria', 'Australia', 'Azerbaijan', 'Belarus', 'Belgium',
		'Brazil', 'Bulgaria', 'Canada', 'China', 'Czech Republic', 'Denmark', 'Ecuador', 'Egypt', 
		'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 
		'India', 'Indonesia', 'Ireland', 'Belgium', 'Brazil', 'Bulgaria', 'Canada', 'China', 
		'Czech Republic', 'Denmark', 'Ecuador', 'Egypt', 'Estonia', 'Finland', 'France', 'Georgia', 
		'Germany', 'Greece', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Ireland');
=======
INSERT INTO [dbo].[Countries] ([Name])
VALUES ('Argentina'), ('Armenia'), ('Austria'), ('Australia'), ('Azerbaijan'), ('Belarus'), ('Belgium'),
		('Brazil'), ('Bulgaria'), ('Canada'), ('China'), ('Czech Republic'), ('Denmark'), ('Ecuador'), ('Egypt'), 
		('Estonia'), ('Finland'), ('France'), ('Georgia'), ('Germany'), ('Greece'), ('Hungary'), ('Iceland'), 
		('India'), ('Indonesia'), ('Ireland'), ('USA'), ('United Kingdom');

INSERT INTO [dbo].[Cities] ([Name], ContryId) VALUES 
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
>>>>>>> 5ffff4d8bba6e5ef7e7bc559b9c9304c442ad976
