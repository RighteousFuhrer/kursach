import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ user, token, account, trigger, session }) {
      if (trigger === "update" && session) {
        token.email = session.user.email;
        token.name = session.user.name;
      }

      return { ...token, ...user };
    },
    session({ session, token }) {
      if (token) {
        session.user = {
          name: token.name,
          email: token.email,
          image: token.picture,
        };

        session.user = token;
      }

      return session;
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

        if (!isPasswordCorrect) {
          console.log("Not a valid password");
        }

        if (user) {
          return {
            email: user.email,
            id: user.id,
            name: user.username,
          } as any;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
});

export { handler as GET, handler as POST };
