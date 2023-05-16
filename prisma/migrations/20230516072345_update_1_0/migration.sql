/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropTable
DROP TABLE [dbo].[User];

-- CreateTable
CREATE TABLE [dbo].[sysdiagrams] (
    [name] NVARCHAR(128) NOT NULL,
    [principal_id] INT NOT NULL,
    [diagram_id] INT NOT NULL IDENTITY(1,1),
    [version] INT,
    [definition] VARBINARY(max),
    CONSTRAINT [PK__sysdiagr__C2B05B61DF083BAE] PRIMARY KEY CLUSTERED ([diagram_id]),
    CONSTRAINT [UK_principal_name] UNIQUE NONCLUSTERED ([principal_id],[name])
);

-- CreateTable
CREATE TABLE [dbo].[__EFMigrationsHistory] (
    [MigrationId] NVARCHAR(150) NOT NULL,
    [ProductVersion] NVARCHAR(32) NOT NULL,
    CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED ([MigrationId])
);

-- CreateTable
CREATE TABLE [dbo].[Bus] (
    [id] INT NOT NULL,
    [capacity] INT,
    [driverId] INT,
    [routeId] INT,
    CONSTRAINT [PK__Bus__3213E83FEE3E7209] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Cashier] (
    [id] INT NOT NULL,
    [fname] VARCHAR(160),
    [sname] VARCHAR(160),
    [salary] FLOAT(53),
    CONSTRAINT [PK__Cashier__3213E83F804A43CB] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Comment] (
    [id] INT NOT NULL,
    [passengerId] INT,
    [created] DATE,
    [comment] TEXT,
    CONSTRAINT [PK__Comment__3213E83F09599589] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Driver] (
    [id] INT NOT NULL,
    [fname] VARCHAR(160),
    [sname] VARCHAR(160),
    [salary] FLOAT(53),
    CONSTRAINT [PK__Driver__3213E83F43F08F50] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Passenger] (
    [id] INT NOT NULL,
    [fname] VARCHAR(40) NOT NULL,
    [sname] VARCHAR(40) NOT NULL,
    [email] VARCHAR(40) NOT NULL,
    [password] VARCHAR(30) NOT NULL,
    CONSTRAINT [PK__Passenge__3213E83F7804B9C7] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Report] (
    [id] INT NOT NULL,
    [sold] DATE,
    [ticketId] INT,
    [cashierId] INT,
    CONSTRAINT [PK__Report__3213E83F9D959685] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[RouteInfo] (
    [id] INT NOT NULL,
    [departureDate] DATE,
    [arivalDate] DATE,
    [departureCity] VARCHAR(160),
    [arrivalCity] VARCHAR(160),
    CONSTRAINT [PK__RouteInf__3213E83F73EFC885] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Schedule] (
    [id] INT NOT NULL,
    [routeId] INT,
    [busId] INT,
    [price] FLOAT(53),
    CONSTRAINT [PK__Schedule__3213E83F559D670B] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Ticket] (
    [id] INT NOT NULL,
    [price] INT,
    [seatNumber] INT,
    [routeId] INT,
    [busId] INT,
    [passengerId] INT,
    [cashierId] INT,
    CONSTRAINT [PK__Ticket__3213E83F39070C67] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [NCLIX_Schedule_Price] ON [dbo].[Schedule]([price]);

-- AddForeignKey
ALTER TABLE [dbo].[Bus] ADD CONSTRAINT [FK_Bus_Driver_driverId] FOREIGN KEY ([driverId]) REFERENCES [dbo].[Driver]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Bus] ADD CONSTRAINT [FK_Bus_RouteInfo_routeId] FOREIGN KEY ([routeId]) REFERENCES [dbo].[RouteInfo]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Comment] ADD CONSTRAINT [FK_Comment_Passenger_passengerId] FOREIGN KEY ([passengerId]) REFERENCES [dbo].[Passenger]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Report] ADD CONSTRAINT [FK_Report_Cashier_cashierId] FOREIGN KEY ([cashierId]) REFERENCES [dbo].[Cashier]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Report] ADD CONSTRAINT [FK_Report_Ticket_ticketId] FOREIGN KEY ([ticketId]) REFERENCES [dbo].[Ticket]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Schedule] ADD CONSTRAINT [FK_Schedule_Bus_busId] FOREIGN KEY ([busId]) REFERENCES [dbo].[Bus]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Ticket] ADD CONSTRAINT [FK_Ticket_Bus_busId] FOREIGN KEY ([busId]) REFERENCES [dbo].[Bus]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Ticket] ADD CONSTRAINT [FK_Ticket_Cashier_cashierId] FOREIGN KEY ([cashierId]) REFERENCES [dbo].[Cashier]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Ticket] ADD CONSTRAINT [FK_Ticket_Passenger_passengerId] FOREIGN KEY ([passengerId]) REFERENCES [dbo].[Passenger]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Ticket] ADD CONSTRAINT [FK_Ticket_RouteInfo_routeId] FOREIGN KEY ([routeId]) REFERENCES [dbo].[RouteInfo]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
