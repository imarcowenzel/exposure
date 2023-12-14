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
        <div className="flex flex-col gap-y-10 px-7 py-16 md:w-full md:px-11 lg:px-16 2xl:px-40">
          <div className="flex flex-wrap items-center justify-center gap-y-8 md:gap-x-6 md:gap-y-20">
            {posts.map((post: PostType) => (
              <figure
                key={post.imageKey}
                className="flex flex-col items-center gap-y-2 md:flex-auto md:px-0 lg:w-80"
              >
                <Link href={`/post/${post._id}`}>
                  <Image
                    src={post.imageUrl}
                    priority
                    alt="Picture"
                    loading="eager"
                    height={345}
                    width={345}
                  />
                </Link>
              </figure>
            ))}
          </div>
        </div>
      )}

    </Container>
  );
};

export default Profile;
