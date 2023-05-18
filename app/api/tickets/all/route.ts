import { faker } from "@faker-js/faker";
import { PrismaClient, Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { LocalTicket } from "@interfaces/Tickets";
import dbClient from "@utils/dbConnect";

const prisma: PrismaClient = dbClient()!;

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;

  let res: LocalTicket[];
  res =
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
where departureDate >  GETDATE()
`;

  return new Response(JSON.stringify(res));
}
