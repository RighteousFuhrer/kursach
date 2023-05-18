import { PrismaClient } from "@prisma/client";

const dbClient = () => {
  let prisma: PrismaClient = new PrismaClient();

  const getConnection = () => {
    if (prisma) {
      return prisma;
    }

    prisma = new PrismaClient();
  };

  return getConnection();
};

export default dbClient;
