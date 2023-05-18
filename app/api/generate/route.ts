import { User, PrismaClient, Prisma } from "@prisma/client";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const user = (await axios.get("https://randomuser.me/api/")).data;

  
  return new NextResponse(
    JSON.stringify({
      email: user.results[0].email,
      username: user.results[0].login.username,
      password: user.results[0].login.password,
    })
  );
}
