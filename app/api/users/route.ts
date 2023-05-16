import { User, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: any) {
  let pas: User[] = await prisma.user.findMany();

  return new Response(JSON.stringify(pas));
}

export async function POST(request: any) {

  //let pas: User[] = await prisma.user.();

  console.log(request);

  return new Response(JSON.stringify(''));
}

export async function UPDATE(request: any) {
  //let pas: User[] = await prisma.user.();

  console.log(request);

  return new Response(JSON.stringify(""));
}
export async function DELETE(request: any) {
  //let pas: User[] = await prisma.user.();

  console.log(request);

  return new Response(JSON.stringify(""));
}
