import mongoose from "mongoose";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NotFound from "@/app/not-found";
import { fetchPostByPostId } from "@/lib/actions/post.actions";
import CloseButton from "./close-button";
import Container from "@/components/container";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "EXPOSURE | Post",
  description: "A ficctitional website to post photographies",
};

interface PostProps {
  params: { id: string };
}

const PostPage: React.FC<PostProps> = async ({ params }) => {

  const objectId = new mongoose.Types.ObjectId(params.id);
  const post = await fetchPostByPostId(objectId);

  if (!post || "success" in post) return <NotFound />;

  const session = await getServerSession(authOptions);

  const createdAt = new Date(post.createdAt);

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(createdAt);

  return (
    <Container className="py-6">

      <div className="flex h-full w-full flex-col items-start gap-y-6 px-5 md:gap-y-12">
        
        <CloseButton />

        {/* Post */}
        <div className="flex w-full flex-col gap-y-4 pt-2.5">
          {/* Post Top */}
          <div className="flex w-full justify-center">
            <Image
              src={post.imageUrl}
              alt={JSON.stringify(post.tags)}
              width={500}
              height={500}
              priority
              className="object-cover"
            />
          </div>

          {/* Post Bottom */}
          <div className="flex w-full flex-col gap-y-2 pt-2">
            {/* Username Container */}
              {session?.user.username === post.createdBy ? (
                <Link
                  href={`/post/${post._id}/edit`}
                  className={cn(buttonVariants({variant: "outline"}), "w-fit")}
                >
                  Edit Post
                </Link>
              ) : (
                <Link href={`/profile/${post.userId}`}>
                  <p className="text-sm font-bold">{post.createdBy}</p>
                </Link>
              )}
            {/* Hashtag Container */}
            <div className="flex gap-x-2">
              {post.tags.map((tag, i) => (
                <p className="text-xs lg:text-sm text-yellow-600" key={i}>
                  #{tag}
                </p>
              ))}
            </div>
            {/* Date Container */}
            <p className="text-xs text-[#888888]">{formattedDate}</p>
          </div>
        </div>
        
      </div>
    </Container>
  );
};

export default PostPage;
