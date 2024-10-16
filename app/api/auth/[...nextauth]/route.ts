import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";

const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,

  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        console.log(user);

        if (!user || user.role !== Role.ADMIN) {
          return null;
        }

        // Direct password comparison without bcrypt
        if (credentials.password !== user.password) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" && user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
          select: { role: true, id: true },
        });

        return dbUser?.role === Role.ADMIN;
      }
      if (account?.provider === "credentials") {
        return user.role === Role.ADMIN;
      }
      return false;
    },
    async jwt({
      token,
      account,
      user,
    }: {
      token: JWT;
      account: {
        access_token?: string;
        [key: string]: any;
      } | null;
      user?: User | AdapterUser;
    }) {
      if (account && account.access_token) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.role = user.role;
        token.userId = user.id;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT & { accessToken?: string; role?: Role; userId?: string };
    }) {
      return {
        ...session,
        accessToken: token.accessToken,
        role: token.role,
        user: {
          ...session.user,
          id: token.userId,
        },
      } as Session & {
        accessToken?: string;
        role?: Role;
        user: { id?: string };
      };
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
