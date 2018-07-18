CREATE TABLE [dbo].[Countries]
(
	[CountryId] INT NOT NULL PRIMARY KEY,
	[Name] varchar(50) not null,
	INDEX idx_CountryName ([Name])
)
