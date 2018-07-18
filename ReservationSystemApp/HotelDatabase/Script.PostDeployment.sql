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

IF (EXISTS(SELECT * FROM [dbo].[ContactTypes]))
BEGIN
    DELETE FROM [dbo].[ContactTypes]
END

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
	DBCC CHECKIDENT ('[dbo].[Cities]', RESEED, 0);
END

IF (EXISTS(SELECT * FROM [dbo].[Countries]))
BEGIN
    DELETE FROM [dbo].[Countries];
	DBCC CHECKIDENT ('[dbo].[Countries]', RESEED, 0);
END

INSERT INTO [dbo].[Countries] ([Name]) 
VALUES ('Argentina', 'Armenia', 'Austria', 'Australia', 'Azerbaijan', 'Belarus', 'Belgium',
		'Brazil', 'Bulgaria', 'Canada', 'China', 'Czech Republic', 'Denmark', 'Ecuador', 'Egypt', 
		'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 
		'India', 'Indonesia', 'Ireland', 'Belgium', 'Brazil', 'Bulgaria', 'Canada', 'China', 
		'Czech Republic', 'Denmark', 'Ecuador', 'Egypt', 'Estonia', 'Finland', 'France', 'Georgia', 
		'Germany', 'Greece', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Ireland');
