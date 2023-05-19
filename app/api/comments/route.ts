import { User, PrismaClient, Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import dbClient from "@utils/dbConnect";

const prisma: PrismaClient = dbClient()!;

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

export async function DELETE(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const res = await prisma.comment.delete({
    where: { id: Number(params.get("id")) },
  });

  if (!res) {
    return new Response(
      JSON.stringify({ code: 400, message: "User already exists" }),
      {
        status: 400,
        statusText: "User already exists",
      }
    );
  }

  return new Response(JSON.stringify(res), {
    status: 200,
  });
}
