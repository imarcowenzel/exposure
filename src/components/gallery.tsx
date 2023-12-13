import Image from "next/image";
import Link from "next/link";

import NotFound from "@/app/not-found";
import { PostType } from "@/types";
import { ActionRes } from "@/types/index";

type GalleryProps = {
  posts: PostType[] | ActionRes;
};

const Gallery: React.FC<GalleryProps> = ({ posts }) => {
  if ("success" in posts) {
    return <NotFound />;
  }

  if (!posts) {
    return (
      <div className="flex items-center justify-center">
        <h3 className="whitespace-nowrap text-sm">
          You have no posts yet! Submit your first post{" "}
          <Link href={"/submit"} className="text-blue-500">
            here
          </Link>
          !
        </h3>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-y-10 px-7 py-16 md:w-full md:px-11 lg:px-16 2xl:px-40">
      <div className="flex flex-wrap items-center justify-center gap-y-8 md:gap-x-6 md:gap-y-20">
        {posts.map((post: PostType) => (
          <figure
            key={post.imageKey}
            className="flex flex-col gap-y-2 md:flex-auto md:px-0 lg:w-80"
          >
            <Link href={`/post/#`}>
              <Image
                src={post.imageUrl}
                priority
                alt="Picture"
                loading="eager"
                height={500}
                width={500}
                className="w-full md:w-96"
              />
            </Link>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
