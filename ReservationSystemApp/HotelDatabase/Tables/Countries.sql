CREATE TABLE [dbo].[Countries]
(
	CountryId nvarchar(3) NOT NULL PRIMARY KEY,
	[Name] varchar(50) not null,
	INDEX idx_CountryName ([Name])
)
