"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

import Post from "@/lib/models/post.model";
import User from "@/lib/models/user.model";
import { connectToMongoDB } from "@/lib/mongodb";
import { ActionRes, PostType } from "@/types";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

interface CreatePostProps {
  imageUrl: string;
  createdBy: string;
  tags: string[];
  imageKey: string;
  profileImage: string;
  _id: mongoose.Schema.Types.ObjectId;
}

export async function createPost({
  imageUrl,
  createdBy,
  tags,
  imageKey,
  _id,
  profileImage,
}: CreatePostProps): Promise<ActionRes> {
  try {
    await connectToMongoDB();

    await Post.create({
      imageUrl,
      createdBy,
      tags,
      imageKey,
      userId: _id,
      profileImage,
    });

    // Update the user's posts array
    await User.findByIdAndUpdate(_id, { $push: { posts: imageKey } });
    // Revalidate the user's profile path to reflect the new post
    revalidatePath(`/profile/${_id}`);

    return { success: true, message: "Post created successfully." };
  } catch (error: any) {
    return { success: false, message: `Error: ${error.message}` };
  }
}

interface DeletePostProps {
  imageKey: string;
  _id: mongoose.Schema.Types.ObjectId;
}

export async function deletePost({
  imageKey,
  _id,
}: DeletePostProps): Promise<ActionRes> {
  try {
    await connectToMongoDB();

    // Attempt to delete post files from uploadthing
    const res = await utapi.deleteFiles(imageKey);

    if (res.success === false) {
      throw new Error("Error: Failed to delete post from uploadthing.");
    }

    // Delete the post data from the database
    const postToDelete = await Post.deleteOne({ imageKey });

    if (postToDelete.acknowledged === false) {
      throw new Error("Error: Failed to delete post from the database.");
    }

    await User.findByIdAndUpdate({ _id }, { $pull: { posts: imageKey } });

    revalidatePath(`/profile/${_id}`);

    return { success: true, message: "Post deleted successfully!" };
  } catch (error: any) {
    return { success: false, message: `Error: ${error.message}` };
  }
}

export async function fetchPosts(): Promise<PostType[] | ActionRes> {
  try {
    await connectToMongoDB();

    const posts = await Post.find({}).sort({ createdAt: -1 });

    return posts;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function fetchPostsByUserId(
  userId: mongoose.Types.ObjectId,
): Promise<PostType[] | ActionRes> {
  try {
    await connectToMongoDB();

    const posts = await Post.find({ userId }).sort({ createdAt: -1 });

    return posts;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function fetchPostByPostId(
  _id: mongoose.Types.ObjectId,
): Promise<PostType | ActionRes> {
  try {
    await connectToMongoDB();

    const post = await Post.findById(_id);

    return post;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function fetchPostsByTagOrAuthor(
  query: string,
): Promise<PostType[] | ActionRes> {
  try {
    await connectToMongoDB();

    // Find posts that match either the author (createdBy) or have the specified tag
    const posts = await Post.find({
      $or: [
        { createdBy: query }, // Match posts by author
        { tags: { $in: [query] } }, // Match posts by tag
      ],
    }).sort({ createdAt: -1 });

    return posts;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

interface EditPostProps {
  _id: mongoose.Schema.Types.ObjectId;
  tags: string[];
}

export async function editPost({
  _id,
  tags,
}: EditPostProps): Promise<ActionRes> {
  try {
    await connectToMongoDB();

    await Post.findByIdAndUpdate(_id, { tags });

    revalidatePath(`/post/${_id}`);

    return { success: true, message: "Post updated successfully." };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// type LikePostProps = {
//   postId: mongoose.Schema.Types.ObjectId;
//   userId: mongoose.Schema.Types.ObjectId | undefined;
// };

// export async function likePost({ postId, userId }: LikePostProps) {
//   try {

//     await connectToMongoDB();

//     await Post.updateOne({ _id: postId }, { $push: { likes: userId } });

//     console.log("Post liked.");

//   } catch (error) {}

// }

// type DislikePostProps = {
//   postId: mongoose.Schema.Types.ObjectId;
//   userId: mongoose.Schema.Types.ObjectId | undefined;
// };

// export async function dislikePost({ postId, userId }: DislikePostProps) {
//   try {
//     await connectToMongoDB();

//     await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });

//     console.log("Post disliked.");
//   } catch (error) {}
// }
