import mongoose from "mongoose";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import NotFound from "@/app/not-found";
import Container from "@/components/container";
import User from "@/components/user";
import { fetchPostsByUserId } from "@/lib/actions/post.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { PostType } from "@/types";

export const metadata: Metadata = {
  title: "EXPOSURE | Profile",
  description: "A ficctitional website to post photographies",
};

const Profile = async ({
  params,
}: {
  params: { id: mongoose.Types.ObjectId };
}) => {
  
  if (JSON.stringify(params.id).replace(/^"(.*)"$/, "$1") === "undefined")
    redirect("/log-in");

  const [user, posts] = await Promise.all([
    fetchUser(params.id),
    fetchPostsByUserId(params.id),
  ]);

  if ("success" in user || "success" in posts) {
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

      {!posts ? (
        <div className="flex items-center justify-center">
          <h3 className="whitespace-nowrap text-sm">
            You have no posts yet! Submit your first post{" "}
            <Link href={"/submit"} className="text-blue-500">
              here
            </Link>
            !
          </h3>
        </div>
      ) : (
        <div className="grid w-fit grid-cols-2 items-center justify-center gap-x-6 gap-y-8 px-6 md:grid-cols-3 md:gap-x-6 md:gap-y-20 md:px-16 2xl:grid-cols-5 2xl:px-24">
          {posts.map((post: PostType) => (
            <figure key={post.imageKey} className="flex flex-col gap-y-2">
              <Link href={`/post/${post._id}`}>
                <Image
                  src={post.imageUrl}
                  priority
                  alt={`${post.createdBy}\`s post`}
                  loading="eager"
                  height={400}
                  width={400}
                />
              </Link>
            </figure>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Profile;
