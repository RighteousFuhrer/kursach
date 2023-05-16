import { User, PrismaClient, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const user = await prisma.user.findFirst({
    where: {
      id: Number(params.get("id")),
    },
  });

  if (user) {
    const { password, ...secureuser } = user;
    return new Response(JSON.stringify(secureuser), {
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

  console.log(params);

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
