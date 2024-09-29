import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./dbConnect";
import User, { IUser } from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials,) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        await dbConnect();
        const user = await User.findOne({ email: credentials.email }) as IUser | null;
        
        if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
          return null;
        }
        return { 
          id: user._id ? user._id.toString() : '',
          email: user.email, 
          name: user.name 
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id as string;

        // Fetch the most up-to-date user data from the database
        await dbConnect();
        const dbUser = await User.findById(token.id).lean();

        if (dbUser) {
          // Update the session with the latest user data
          session.user = {
            ...session.user,
            ...dbUser,
            id: (dbUser as { _id: { toString(): string } })._id.toString(), // Ensure id is a string
          };
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};
