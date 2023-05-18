import { faker } from "@faker-js/faker";
import { User, PrismaClient, Prisma } from "@prisma/client";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import dbClient from "@utils/dbConnect";

const prisma: PrismaClient = dbClient()!;

export async function POST(request: NextRequest) {
  const data = await request.json();

  const users = await prisma.user.findMany();
  const busRoutes = await prisma.busRoute.findMany();

  [...new Array(data.amount)].forEach(async () => {
    axios.post(
      "http://localhost:3000/api/tickets",
      {
        userId: users[faker.number.int({ max: users.length - 1 })].id,
        busRouteId:
          busRoutes[faker.number.int({ max: busRoutes.length - 1 })].id,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  });

  return new NextResponse(JSON.stringify({}), {
    status: 200,
  });
}
