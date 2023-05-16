/*
  Warnings:

  - You are about to drop the column `passengerId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `cashierId` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `passengerId` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `routeId` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the `Passenger` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Schedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `salary` on the `Cashier` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Bus] DROP CONSTRAINT [FK_Bus_Driver_driverId];

-- DropForeignKey
ALTER TABLE [dbo].[Bus] DROP CONSTRAINT [FK_Bus_RouteInfo_routeId];

-- DropForeignKey
ALTER TABLE [dbo].[Comment] DROP CONSTRAINT [FK_Comment_Passenger_passengerId];

-- DropForeignKey
ALTER TABLE [dbo].[Report] DROP CONSTRAINT [FK_Report_Cashier_cashierId];

-- DropForeignKey
ALTER TABLE [dbo].[Report] DROP CONSTRAINT [FK_Report_Ticket_ticketId];

-- DropForeignKey
ALTER TABLE [dbo].[Schedule] DROP CONSTRAINT [FK_Schedule_Bus_busId];

-- DropForeignKey
ALTER TABLE [dbo].[Ticket] DROP CONSTRAINT [FK_Ticket_Bus_busId];

-- DropForeignKey
ALTER TABLE [dbo].[Ticket] DROP CONSTRAINT [FK_Ticket_Cashier_cashierId];

-- DropForeignKey
ALTER TABLE [dbo].[Ticket] DROP CONSTRAINT [FK_Ticket_Passenger_passengerId];

-- DropForeignKey
ALTER TABLE [dbo].[Ticket] DROP CONSTRAINT [FK_Ticket_RouteInfo_routeId];

-- AlterTable
ALTER TABLE [dbo].[Comment] DROP COLUMN [passengerId];
ALTER TABLE [dbo].[Comment] ADD [userId] INT;

-- AlterTable
ALTER TABLE [dbo].[Ticket] DROP COLUMN [cashierId],
[passengerId],
[routeId];
ALTER TABLE [dbo].[Ticket] ADD [reportId] INT,
[userId] INT;



-- RedefineTables
BEGIN TRANSACTION;
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'Driver'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_Driver] (
    [id] INT NOT NULL IDENTITY(1,1),
    [fname] VARCHAR(160),
    [sname] VARCHAR(160),
    [salary] FLOAT(53),
    CONSTRAINT [PK__Driver__3213E83F43F08F50] PRIMARY KEY CLUSTERED ([id])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_Driver] ON;
IF EXISTS(SELECT * FROM [dbo].[Driver])
    EXEC('INSERT INTO [dbo].[_prisma_new_Driver] ([fname],[id],[salary],[sname]) SELECT [fname],[id],[salary],[sname] FROM [dbo].[Driver] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_Driver] OFF;
DROP TABLE [dbo].[Driver];
EXEC SP_RENAME N'dbo._prisma_new_Driver', N'Driver';
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'Cashier'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_Cashier] (
    [id] INT NOT NULL IDENTITY(1,1),
    [fname] VARCHAR(160),
    [sname] VARCHAR(160),
    CONSTRAINT [PK__Cashier__3213E83F804A43CB] PRIMARY KEY CLUSTERED ([id])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_Cashier] ON;
IF EXISTS(SELECT * FROM [dbo].[Cashier])
    EXEC('INSERT INTO [dbo].[_prisma_new_Cashier] ([fname],[id],[sname]) SELECT [fname],[id],[sname] FROM [dbo].[Cashier] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_Cashier] OFF;
DROP TABLE [dbo].[Cashier];
EXEC SP_RENAME N'dbo._prisma_new_Cashier', N'Cashier';
COMMIT;

-- AddForeignKey
ALTER TABLE [dbo].[Bus] ADD CONSTRAINT [FK_Bus_Driver_driverId] FOREIGN KEY ([driverId]) REFERENCES [dbo].[Driver]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Bus] ADD CONSTRAINT [FK_Bus_RouteInfo_routeId] FOREIGN KEY ([routeId]) REFERENCES [dbo].[RouteInfo]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[BusSeats] ADD CONSTRAINT [FK_BusSeat_Bus_busId] FOREIGN KEY ([busId]) REFERENCES [dbo].[Bus]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[BusSeats] ADD CONSTRAINT [FK_BusSeat_User_userId] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Comment] ADD CONSTRAINT [FK_Comment_User_userId] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Report] ADD CONSTRAINT [FK_Report_Cashier_cashierId] FOREIGN KEY ([cashierId]) REFERENCES [dbo].[Cashier]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Ticket] ADD CONSTRAINT [FK_Ticket_Report_reportId] FOREIGN KEY ([reportId]) REFERENCES [dbo].[Report]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Ticket] ADD CONSTRAINT [FK_Ticket_Bus_busId] FOREIGN KEY ([busId]) REFERENCES [dbo].[Bus]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Ticket] ADD CONSTRAINT [FK_Ticket_User_userId] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
