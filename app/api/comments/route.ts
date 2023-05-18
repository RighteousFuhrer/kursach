import { User, PrismaClient, Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import dbClient from "@utils/dbConnect";

const prisma:PrismaClient = dbClient()!;

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;

  const res = await prisma.comment.findMany({
    where: {
      userId: Number(params.get("userId")),
    },
  });

  return new Response(JSON.stringify(res));
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const comment: Prisma.CommentUncheckedCreateInput = {
    created: new Date(Date.now()),
    comment: data.comment,
    userId: data.userId,
  };

  const res = await prisma.comment.create({ data: comment });

  return new Response("");
}
