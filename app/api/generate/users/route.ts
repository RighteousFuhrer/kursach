import { User, PrismaClient, Prisma } from "@prisma/client";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const users: {
    [key: string]: string | object;
  }[] = (await axios.get(`https://randomuser.me/api/?results=${data.amount}`))
    .data.results;

  //return new NextResponse(JSON.stringify(users), { status: 200 });

  users.forEach((user: any) => {
    axios.post(
      "http://localhost:3000/api/users",
      {
        email: user.email,
        username: user.login.username,
        password: user.login.password,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  });

  return new NextResponse("", { status: 200 });
}
