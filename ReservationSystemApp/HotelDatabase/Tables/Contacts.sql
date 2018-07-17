CREATE TABLE [dbo].[Contacts]
(
	ContactId INT NOT NULL PRIMARY KEY,
	ContactValue nvarchar not null,
	ContactTypeId int REFERENCES ContactTypes(ContactTypeId),
	HotelId int FOREIGN KEY REFERENCES Hotels(HotelId)
)
