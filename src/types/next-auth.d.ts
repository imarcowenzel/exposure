import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: mongoose.Schema.Types.ObjectId;
      username: string;
      email: string;
      name: string;
      password: string;
      image: string;
      imageKey: string;
      createdAt: Date;
      updatedAt: Date;
      posts: string[];
      googleProvider: boolean;
      __v: number;
    } & DefaultSession["user"];
  }
}