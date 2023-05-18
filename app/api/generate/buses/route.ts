import { User, PrismaClient, Prisma } from "@prisma/client";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

import { faker } from "@faker-js/faker";
import dbClient from "@utils/dbConnect";

const prisma = dbClient()!;

export async function POST(request: NextRequest) {
  const data = await request.json();

  const drivers = await prisma.driver.findMany();
  const routes =await prisma.route.findMany();

  [...new Array(data.amount)].forEach(async () => {
    const bus: Prisma.BusUncheckedCreateInput = {
      capacity : Math.floor(Math.random()*40)  + 20,
      driverId : drivers[Math.floor(Math.random()*drivers.length)].id
    };
    await prisma.bus.create({ data: bus });
  });

  return new NextResponse(JSON.stringify({}), {
    status: 200,
  });
}
