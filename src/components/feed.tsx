import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { PostType } from "@/types";
import Container from "./container";

type FeedProps = {
  posts: PostType[];
};

const Feed: React.FC<FeedProps> = ({ posts }) => {
  return (
    <Container className="items-start px-6 py-16 md:px-16 2xl:px-24">

      <div className="flex items-center gap-x-2">
        <ChevronRight size={36} strokeWidth={5} />
        <h1 className="text-3xl font-bold">FROM THE COMMUNITY</h1>
      </div>

      <div className="grid grid-cols-2 items-center justify-center gap-x-6 gap-y-8 md:grid-cols-3 md:gap-x-6 md:gap-y-20 2xl:grid-cols-5">
        {posts.map((post, i) => (
          <figure key={i} className="flex flex-col gap-y-2">
            {/* Image Container */}
            <Link href={`#`}>
              <Image
                src={post.imageUrl}
                priority
                alt="Picture"
                loading="eager"
                height={500}
                width={500}
              />
            </Link>

            {/* Caption Container */}
            <figcaption className="flex items-center justify-between px-2">
              <Link href={`#`} className="flex items-center gap-x-4">
                <div className="relative h-6 w-6">
                  <Image
                    src={post.profileImage || "/assets/profile-picture.svg"}
                    alt={JSON.stringify(post._id)}
                    fill
                    priority
                    sizes="100svh"
                    className="rounded-full object-cover"
                  />
                </div>

                <h6 className="text-xs text-[#737373]">{`${post.createdBy}`}</h6>
              </Link>
            </figcaption>
          </figure>
        ))}
      </div>

    </Container>
  );
};

export default Feed;
