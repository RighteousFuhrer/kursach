import { User, PrismaClient, Prisma } from "@prisma/client";
import { NextRequest } from "next/server";

import dbClient from "@utils/dbConnect";

const prisma: PrismaClient = dbClient()!;

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: params.get("email") || "",
        },
        {
          id: Number(params.get("id") || -1),
        },
      ],
    },
  });

  if (user) {
    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } else {
    return new Response(
      JSON.stringify({ code: 400, message: "User not found" }),
      {
        status: 400,
        statusText: "User already exists",
      }
    );
  }
}

export async function POST(request: NextRequest) {
  let res;
  try {
    const data = await request.json();

    if (
      await prisma.user.findFirst({
        where: {
          OR: [
            {
              email: data.email,
            },
            {
              username: data.username,
            },
          ],
        },
      })
    ) {
      throw new Error("User exists");
    }
    let user: Prisma.UserCreateInput;
    user = {
      email: data.email,
      username: data.username,
      password: data.password,
    };

    res = await prisma.user.create({ data: user });
  } catch (error) {
    console.log(error);
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

export async function PUT(request: NextRequest) {
  const data: User = await request.json();
  const res = await prisma.user.update({
    where: { id: Number(data.id) },
    data: {
      email: data.email,
      password: data.password,
      username: data.username,
    },
  });

  if (!res) {
    return new Response(
      JSON.stringify({ code: 400, message: "User not found" }),
      {
        status: 400,
        statusText: "User not found",
      }
    );
  }

  return new Response(JSON.stringify(res), {
    status: 200,
  });
}
export async function DELETE(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const res = await prisma.user.delete({
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
