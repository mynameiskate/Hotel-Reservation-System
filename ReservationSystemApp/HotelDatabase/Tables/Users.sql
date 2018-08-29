CREATE TABLE [dbo].[Users]
(
	[UserId] int NOT NULL IDENTITY PRIMARY KEY,
	Email nvarchar(50),
    INDEX idx_UserEmail ([Email]),
	PasswordHash varbinary(MAX) NOT NULL,
	PasswordSalt varbinary(MAX) NOT NULL,
	IsAdmin bit DEFAULT 0 NULL,
	ShortName nvarchar(50),
	FullName nvarchar(MAX)
)