CREATE TABLE [dbo].[Users]
(
	[UserId] INT NOT NULL PRIMARY KEY,
	Email nvarchar(50),
	PasswordHash nvarchar(MAX) NOT NULL,
	IsAdmin bit DEFAULT 0 NULL ,
	ShortName nvarchar(50),
	FullName nvarchar(MAX)
)
