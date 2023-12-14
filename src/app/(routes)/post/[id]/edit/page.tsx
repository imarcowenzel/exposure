import mongoose from "mongoose";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NotFound from "@/app/not-found";
import { fetchPostByPostId } from "@/lib/actions/post.actions";
import Edit from "./edit";

const EditPage = async ({
  params,
}: {
  params: { id: mongoose.Types.ObjectId };
}) => {

  try {
    const post = await fetchPostByPostId(params.id);

    if (!post || "success" in post) return <NotFound />;

    const session = await getServerSession(authOptions);

    if (!session) return <NotFound />;

    if (JSON.stringify(post.userId) !== JSON.stringify(post.userId))
      return <NotFound />;

    const { user } = session;

    return <Edit user={user} post={post} />;

  } catch (error: any) {

    return <NotFound />;

  }
};

export default EditPage;
