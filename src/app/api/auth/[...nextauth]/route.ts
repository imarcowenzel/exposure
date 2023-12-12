import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { createUserGoogle } from "@/lib/actions/user.actions";
import User from "@/lib/models/user.model";
import { connectToMongoDB } from "@/lib/mongodb";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "string" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return Error("Please fill in all required fields.");
        }

        const { email, password } = credentials;

        try {
          await connectToMongoDB();

          const user = await User.findOne({ email });

          if (!user) {
            throw Error("User not found. Please check the provided email.");
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            throw new Error(
              "Incorrect password. Please check your password and try again.",
            );
          }

          return user;
        } catch (error: any) {
          throw Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    // @ts-ignore
    async session({ session }) {
      const email = session.user?.email;
      try {
        await connectToMongoDB();
        const user = await User.findOne({ email });
        return { user };
      } catch (error: any) {
        throw Error(error.message);
      }
    },

    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const { name, email, image } = user;

        const CreateUserGoogleData = {
          name: name || "",
          email: email || "",
          image: image || "",
          googleProvider: true,
        };

        try {
          await createUserGoogle(CreateUserGoogleData);
          return true;
        } catch (error: any) {
          throw Error(error.message);
        }
      }

      return true;
    },
  },
  pages: {
    signIn: "/log-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
