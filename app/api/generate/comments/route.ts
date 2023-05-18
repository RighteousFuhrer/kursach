import { User, PrismaClient, Prisma } from "@prisma/client";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

import { faker } from "@faker-js/faker";
import dbClient from "@utils/dbConnect";

const prisma = dbClient()!;

export async function POST(request: NextRequest) {
  const data = await request.json();

  const users = await prisma.user.findMany();

  [...new Array(data.amount)].forEach(async () => {
    const comment: Prisma.CommentUncheckedCreateInput = {
      created: faker.date.recent(),
      comment: faker.lorem.sentences({ min: 2, max: 8 }),
      userId: users[Math.floor(Math.random() * users.length)].id,
    };

    await prisma.comment.create({ data: comment });
  });

  return new NextResponse(JSON.stringify({}), {
    status: 200,
  });
}
