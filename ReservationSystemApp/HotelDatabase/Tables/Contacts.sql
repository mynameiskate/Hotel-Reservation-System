CREATE TABLE [dbo].[Contacts]
(
	ContactId INT NOT NULL IDENTITY PRIMARY KEY,
	ContactValue nvarchar not null,
	ContactTypeId int REFERENCES ContactTypes(ContactTypeId) NOT NULL,
	HotelId int FOREIGN KEY REFERENCES Hotels(HotelId),
	UserId int FOREIGN KEY REFERENCES Users(UserId)
)
