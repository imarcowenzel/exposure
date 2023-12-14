import mongoose from "mongoose";

import NotFound from "@/app/not-found";
import Container from "@/components/container";
import Gallery from "@/components/gallery";
import User from "@/components/user";
import { fetchPostsByUserId } from "@/lib/actions/post.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const Profile = async ({
  params,
}: {
  params: { id: mongoose.Types.ObjectId };
}) => {

  if (JSON.stringify(params.id).replace(/^"(.*)"$/, '$1') === "undefined") redirect("/log-in")

  const [user, posts] = await Promise.all([
    fetchUser(params.id),
    fetchPostsByUserId(params.id),
  ]);

  if ("success" in user) {
    return <NotFound />;
  }

  return (
    <Container>
      <div className="h-full w-full">
        <User src={user.image} username={user.username} />
      </div>

      <div className="flex gap-x-4">
        <h2 className="bg-black px-4 py-1 text-white">Gallery</h2>
      </div>

      <Gallery posts={posts} />
    </Container>
  );
};

export default Profile;
