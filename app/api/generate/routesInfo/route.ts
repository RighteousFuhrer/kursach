import { User, PrismaClient, Prisma } from "@prisma/client";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

import { faker } from "@faker-js/faker";
import dbClient from "@utils/dbConnect";

const prisma = dbClient()!;

export async function POST(request: NextRequest) {
  const data = await request.json();

  [...new Array(data.amount)].forEach(async () => {
    const route: Prisma.RouteUncheckedCreateInput = {
      departureCity: faker.location.city(),
      arrivalCity: faker.location.city(),
    };

    await prisma.route.create({ data: route });
  });

  return new NextResponse(JSON.stringify({}), {
    status: 200,
  });
}
