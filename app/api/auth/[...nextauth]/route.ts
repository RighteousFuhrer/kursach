import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, trigger, session }) {
      if (trigger === "update" && session?.name) {
        token.name = session;
      }
      return token;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example.mail@com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials!.email,
          },
        });

        if (!user) {
          throw new Error("Email is not registered");
        }
        const isPasswordCorrect = credentials!.password === user.password;

        // const valid = await compare(credentials!.password, user.password);

        if (!isPasswordCorrect) {
          console.log("Not a valid password");
        }

        if (user) {
          return user as any;
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
