import { faker } from "@faker-js/faker";
import { PrismaClient, Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { LocalTicket } from "@interfaces/Tickets";
import dbClient from "@utils/dbConnect";

const prisma: PrismaClient = dbClient()!;

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;

  const res = await prisma.comment.findMany({
    orderBy: {
      id : "desc"
    },
    include : {
      user: true
    }
  });

  return new Response(JSON.stringify(res));
}
