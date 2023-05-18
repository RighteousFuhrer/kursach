import { User, PrismaClient, Prisma } from "@prisma/client";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

import { faker } from "@faker-js/faker";
import dbClient from "@utils/dbConnect";

const prisma = dbClient()!;

export async function POST(request: NextRequest) {
  const data = await request.json();

  const buses = await prisma.bus.findMany();
  const routes = await prisma.route.findMany();
  

  [...new Array(data.amount)].forEach(async () => {
    let fromDate = new Date();
    const status = faker.number.int({ max: 1 });

    if (status === 0) {
      fromDate = faker.date.recent({ days: 30, refDate: Date.now() });
    } else if (status === 1) {
      fromDate = faker.date.soon({ days: 30, refDate: Date.now() });
    }

    fromDate.setHours(
      faker.number.int({ max: 24 }),
      faker.number.int({ max: 60 })
    );

    let toDate: Date = faker.date.between({
      from: fromDate,
      to: faker.date.soon({ days: 3, refDate: fromDate }),
    });

    toDate.setHours(
      faker.number.int({ max: 24 }),
      faker.number.int({ max: 60 })
    );

    if (fromDate.getTime() > toDate.getTime()) {
      let temp = new Date(fromDate);
      fromDate = toDate;
      toDate = temp;
    }

    const busRoute: Prisma.BusRouteUncheckedCreateInput = {
      id: faker.number.int({ min: 100000000, max: 999999999 }),
      routeId: routes[faker.number.int({ min: 0, max: routes.length - 1 })].id,
      busId: buses[faker.number.int({ min: 0, max: buses.length - 1 })].id,
      departureDate: fromDate,
      arivalDate: toDate,
      status,
    };
    await prisma.busRoute.create({ data: busRoute });
  });

  return new NextResponse(JSON.stringify({}), {
    status: 200,
  });
}
