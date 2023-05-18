import { User, PrismaClient, Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import dbClient from "@utils/dbConnect";

const prisma: PrismaClient = dbClient()!;

export async function GET(req: NextRequest) {
  const arr = await prisma.route.findMany({
    select: {
      arrivalCity: true,
    },
  });

  const dep = await prisma.route.findMany({
    select: {
      departureCity: true,
    },
  });

  return new Response(JSON.stringify({ dep, arr }));
}
