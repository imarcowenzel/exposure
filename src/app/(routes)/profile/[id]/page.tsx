import mongoose from "mongoose";

import NotFound from "@/app/not-found";
import Gallery from "@/components/gallery";
import User from "@/components/user";
import { fetchPostsByUserId } from "@/lib/actions/post.actions";
import { fetchUser } from "@/lib/actions/user.actions";

const Profile = async ({
  params,
}: {
  params: { id: mongoose.Types.ObjectId };
}) => {
  
  const [user, posts] = await Promise.all([
    fetchUser(params.id),
    fetchPostsByUserId(params.id),
  ]);

  if ("success" in user) {
    return <NotFound />;
  }

  return (
    <main className="flex min-h-[calc(100dvh-497px)] w-full flex-col items-center justify-center gap-y-10 py-12 md:min-h-[calc(100dvh-321px)] lg:min-h-[calc(100dvh-256.98px)]">
      <section className="h-full w-full">
        <User src={user.image} username={user.username} />
      </section>

      <section className="flex gap-x-4">
        <h2 className="bg-black px-4 py-1 text-white">Gallery</h2>
      </section>
      <Gallery posts={posts} />
    </main>
  );
};

export default Profile;
