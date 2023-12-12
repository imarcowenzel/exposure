"use server";

import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

import Post from "@/lib/models/post.model";
import User from "@/lib/models/user.model";
import { connectToMongoDB } from "@/lib/mongodb";
import {
  generateUniqueUsername,
  validateEmail,
  validateUsername,
} from "@/lib/utils/validations";
import { ActionRes, UserType } from "@/types";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

interface CreateUserProps {
  username: string;
  email: string;
  password: string;
}

export async function createUser({
  username,
  email,
  password,
}: CreateUserProps): Promise<ActionRes> {
  try {
    await connectToMongoDB();

    await validateUsername(username);

    await validateEmail(email);

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return { success: true, message: "Sign up successfully." };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

interface CreateUserGoogleProps {
  name: string;
  email: string;
  image: string;
  googleProvider: boolean;
}

export async function createUserGoogle({
  name,
  email,
  image,
  googleProvider,
}: CreateUserGoogleProps): Promise<UserType | ActionRes> {
  try {
    await connectToMongoDB();

    // Check if a user with the same email already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return userExists; // Return the existing user if found
    }

    // Split the full name into parts and get the first name
    const nameParts = name?.split(" ");

    const firstName = nameParts && nameParts.length > 0 ? nameParts[0] : "user";

    // Generate a unique username based on the first name
    const username = await generateUniqueUsername(firstName);

    const user = await User.create({
      username,
      name,
      email,
      image,
      googleProvider,
    });

    return user;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

interface DeleteAccountProps {
  _id: mongoose.Schema.Types.ObjectId;
  password: string;
}

export async function deleteAccount({
  _id,
  password,
}: DeleteAccountProps): Promise<ActionRes> {
  try {
    await connectToMongoDB();

    const user = await User.findById(_id);

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      throw new Error("Password is wrong!");
    }

    // Check if the user has any posts
    if (user.posts.length === 0) {
      // Delete the user's account from the database
      await User.findByIdAndDelete(_id);

      return { success: true, message: "Account deleted successfully!" };
    }

    // Find posts with imageKeys matching user's posts
    const postsKeys = await Post.find({ imageKey: { $in: user?.posts } });

    // Extract imageKeys from the found posts
    const imageKeys = postsKeys.map((post) => post.imageKey);

    // Delete the files associated with imageKeys
    const deleteFiles = await utapi.deleteFiles(imageKeys);

    if (deleteFiles.success === false) {
      throw new Error("Failed to delete posts from uploadthing!");
    }

    const postsToDelete = await Post.deleteMany({ userId: user._id });

    if (postsToDelete.deletedCount === 0) {
      throw new Error("Failed to delete posts from uploadthing!");
    }

    await User.findByIdAndDelete(_id);

    return { success: true, message: "User deleted successfully!" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

interface DeleteAccountGoogleProps {
  _id: mongoose.Schema.Types.ObjectId;
  googleProvider: boolean;
}

export async function deleteAccountGoogle({
  _id,
  googleProvider,
}: DeleteAccountGoogleProps): Promise<ActionRes> {
  try {
    await connectToMongoDB();

    const user = await User.findById(_id);

    // Check if the user has any posts
    if (user.posts.length === 0) {
      // Delete the user's account from the database
      await User.findByIdAndDelete(_id);
      return { success: true, message: "Account deleted successfully!" };
    }

    // Find posts with imageKeys matching user's posts
    const postsKeys = await Post.find({ imageKey: { $in: user?.posts } });

    // Extract imageKeys from the found posts
    const imageKeys = postsKeys.map((post) => post.imageKey);

    // Delete the files associated with imageKeys
    const deleteFiles = await utapi.deleteFiles(imageKeys);

    if (deleteFiles.success === false) {
      throw new Error("Failed to delete posts from uploadthing!");
    }

    const postsToDelete = await Post.deleteMany({ userId: user._id });

    if (postsToDelete.deletedCount === 0) {
      throw new Error("Failed to delete posts from uploadthing!");
    }

    await User.findByIdAndDelete(_id);

    return { success: true, message: "User deleted successfully!" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function fetchUser(
  _id: mongoose.Types.ObjectId,
): Promise<UserType | ActionRes> {
  try {
    await connectToMongoDB();

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found!");
    }

    return user;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

interface ChangePasswordProps {
  _id: mongoose.Schema.Types.ObjectId;
  currentPassword: string;
  newPassword: string;
}

export async function changePassword({
  _id,
  currentPassword,
  newPassword,
}: ChangePasswordProps): Promise<ActionRes> {
  try {
    await connectToMongoDB();

    const user = await User.findById(_id);

    const passwordsMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordsMatch) {
      throw new Error("Current password is wrong!");
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    await User.findByIdAndUpdate(_id, { password: hashedNewPassword });

    return { success: true, message: "Password changed successfully!" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

interface EditProfileProps {
  _id: mongoose.Schema.Types.ObjectId;
  newUsername: string;
}

export async function editUsername({
  _id,
  newUsername,
}: EditProfileProps): Promise<ActionRes> {
  try {
    await connectToMongoDB();

    const user = await User.findById(_id);

    user.username = newUsername;

    await user.save();

    const posts = await Post.find({ imageKey: { $in: user?.posts } });

    posts.map(async (post) => {
      post.createdBy = newUsername;
      await post.save();
    });

    revalidatePath(`/profile/${_id}`);

    return { success: true, message: "Username updated successfully." };
  } catch (error: any) {
    if (error.message.includes("username_1 dup key:")) {
      return {
        success: false,
        message: "Username already in use. Please, choose another username.",
      };
    }

    return { success: false, message: error.message };
  }
}

interface EditProfilePictureProps {
  _id: mongoose.Schema.Types.ObjectId;
  image: string;
  imageKey: string;
}

export async function editProfilePhoto({
  _id,
  image,
  imageKey,
}: EditProfilePictureProps): Promise<ActionRes> {
  try {
    await connectToMongoDB();

    const user = await User.findById(_id);

    if (user.imageKey) {
      try {
        // Try to delete the previours image
        await utapi.deleteFiles(user.imageKey);
      } catch (deleteError) {
        // Handle delete error, but continue the updating
        console.error("Failed to delete previous photo:", deleteError);
      }
    }

    const updateData = { image, imageKey };

    await User.updateOne({ _id }, updateData);

    await Post.updateOne({ userId: _id }, { profileImage: image });

    revalidatePath(`/profile/${_id}`);
    revalidatePath("/");

    return { success: true, message: "Profile picture updated successfully!" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

interface DeleteProfilePictureProps {
  _id: mongoose.Schema.Types.ObjectId;
}

export async function deleteProfilePhoto({
  _id,
}: DeleteProfilePictureProps): Promise<ActionRes> {
  try {
    await connectToMongoDB();

    const user = await User.findById(_id);

    const deleteFile = await utapi.deleteFiles(user.imageKey);

    if (!deleteFile.success) {
      throw new Error("Failed to remove the picture! Please try again.");
    }

    user.image = undefined;
    user.imageKey = undefined;
    await user.save();

    revalidatePath(`/profile/${_id}`);
    revalidatePath(`/account`);

    return { success: true, message: "Profile picture removed successfully!" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
