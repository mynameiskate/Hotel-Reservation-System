CREATE TABLE [dbo].[Countries]
(
	CountryId INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
	[Name] varchar(50) not null,
	INDEX idx_CountryName ([Name])
)
