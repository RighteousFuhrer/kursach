import { User, PrismaClient } from "@prisma/client";
import { NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  let pas: User[] = await prisma.user.findMany();

  console.log(request)

  return new Response(JSON.stringify(pas));
}

export async function POST(request:NextRequest) {
  //let pas: User[] = await prisma.user.();

  console.log(await request.json());

  return new Response(JSON.stringify(request.body));
}

export async function UPDATE(request: Request) {
  //let pas: User[] = await prisma.user.();

  console.log(request.body);

  return new Response(JSON.stringify(request.body));
}
export async function DELETE(request: Request) {
  //let pas: User[] = await prisma.user.();

  console.log(request.body);

  return new Response(JSON.stringify(request.body));
}
