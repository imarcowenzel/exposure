import mongoose from "mongoose";
import { z } from "zod";

import { editPostSchema, searchFormSchema } from "@/lib/validations/post";
import {
  changePasswordSchema,
  deleteAccountSchema,
  editProfileSchema,
  logInSchema,
  signUpSchema,
} from "@/lib/validations/user";

export type UserType = {
  _id: mongoose.Schema.Types.ObjectId;
  username: string;
  email: string;
  name: string;
  image: string;
  imageKey: string;
  posts: string[];
  googleProvider: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type PostType = {
  _id: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  imageUrl: string;
  imageKey: string;
  createdBy: string;
  profileImage: string;
  tags: string[];
  likes: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type SignUpSchema = z.infer<typeof signUpSchema>;

export type LogInSchema = z.infer<typeof logInSchema>;

export type ChangePasswordType = z.infer<typeof changePasswordSchema>;

export type EditProfileType = z.infer<typeof editProfileSchema>;

export type SearchFormType = z.infer<typeof searchFormSchema>;

export type EditPostType = z.infer<typeof editPostSchema>;

export type DeleteAccountSchema = z.infer<typeof deleteAccountSchema>;

export type ActionRes = { success: boolean; message: string };
