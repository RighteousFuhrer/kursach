import { faker } from "@faker-js/faker";
import { PrismaClient, Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { LocalTicket } from "@interfaces/Tickets";
import dbClient from "@utils/dbConnect";

const prisma: PrismaClient = dbClient()!;

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;

  let res =
    await prisma.$queryRaw`SELECT [BusTicket].seatNumber,[BusRoute].id as routeId, [busId], departureDate, departureCity, arivalDate,price, arrivalCity FROM 
    dbo.BusTicket
    join 
    dbo.BusRoute
    on dbo.BusTicket.routeId = BusRoute.id
    join 
    dbo.Route 
    on BusRoute.routeId =  dbo.Route.id
    join 
    dbo.Receipt
    on Receipt.busTicketId  = BusTicket.id
    where [BusTicket].userId = ${params.get('userId')}`;

  return new Response(JSON.stringify(res));
}

export async function POST(request: NextRequest) {
  const data = await request.json();

  const cashiers = await prisma.cashier.findMany();
  const busRoute = await prisma.busRoute.findFirst({
    where: {
      id: Number(data.routeId),
    },
  });
  const cap = await prisma.bus.findFirst({
    where: {
      id: busRoute?.busId || -1,
    },
    select: {
      capacity: true,
    },
  });
  const lastSeat = await prisma.busTicket.findFirst({
    where: {
      routeId: Number(data.routeId),
    },
    orderBy: {
      id: "desc",
    },
    select: {
      seatNumber: true,
    },
  });

  if ((lastSeat?.seatNumber || 0) >= (cap?.capacity || 0) - 1) {
    return new Response("", {
      status: 400,
      statusText: "falty data",
    });
  }

  const busTicketId = faker.number.int({ min: 100000000, max: 999999999 });
  const receiptId = faker.number.int({ min: 100000000, max: 999999999 });

  const busTicket: Prisma.BusTicketUncheckedCreateInput = {
    id: busTicketId,
    routeId: Number(data.routeId),
    seatNumber: lastSeat ? lastSeat.seatNumber + 1 : 1,
    userId: Number(data.userId),
  };

  const receipt: Prisma.ReceiptUncheckedCreateInput = {
    id: receiptId,
    busTicketId,
    price: faker.number.int({ min: 50, max: 10000 }),
    cashierId: cashiers[faker.number.int({ max: cashiers.length - 1 })].id,
    sellDate: faker.date.between({
      from: faker.date.recent({ days: 30, refDate: Date.now() }),
      to: faker.date.soon({ days: 30, refDate: Date.now() }),
    }),
  };

  await prisma.busTicket.create({ data: busTicket });
  await prisma.receipt.create({ data: receipt });

  return new Response(JSON.stringify({ ...busTicket, ...receipt }), {
    status: 200,
  });
}
