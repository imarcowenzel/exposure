import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Container from "@/components/container";
import { fetchPosts } from "@/lib/actions/post.actions";

const Home: React.FC = async () => {
  const posts = await fetchPosts();

  if ("success" in posts) {
    return (
      <Container>
        <h1 className="text-3xl">No posts yet!</h1>
      </Container>
    );
  }

  return (
    <Container className="items-start px-6 py-16 md:px-16 2xl:px-24">
      <div className="flex items-center gap-x-2">
        <ChevronRight size={36} strokeWidth={5} />
        <h1 className="text-3xl font-bold">FROM THE COMMUNITY</h1>
      </div>

      <div className="grid grid-cols-2 items-center justify-center gap-x-6 gap-y-8 md:grid-cols-3 md:gap-x-6 md:gap-y-20 2xl:grid-cols-5">
        {posts.map((post) => (
          <figure
            key={JSON.stringify(post._id)}
            className="flex flex-col gap-y-2"
          >
            <Link href={`/post/${post._id}`}>
              <Image
                src={post.imageUrl}
                priority
                alt={`${post.createdBy}\`s post`}
                loading="eager"
                height={500}
                width={500}
              />
            </Link>

            {/* Caption Container */}
            <figcaption className="flex items-center justify-between px-2">
              <Link
                href={`/profile/${post.userId}`}
                className="flex items-center gap-x-4"
              >

                <div className="relative h-6 w-6">
                  <Image
                    src={post.profileImage || "/assets/profile-picture.svg"}
                    alt={`${post.createdBy}\`s profile picture`}
                    fill
                    priority
                    sizes="100svh"
                    className="rounded-full object-cover"
                  />
                </div>

                <p className="text-xs text-[#737373]">{`${post.createdBy}`}</p>
              </Link>
            </figcaption>
          </figure>
        ))}
      </div>
    </Container>
  );
};

export default Home;
