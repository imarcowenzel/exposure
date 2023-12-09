import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

import { pics } from "@/config";

const Feed = () => {

  return (
    <h1>
        Feed
    </h1>

    // <div className="flex flex-col gap-16 px-5 py-16 2xl:px-40">

    //   <div className="flex items-center gap-x-2">
    //     <ChevronRight className="h-9 w-9" />
    //     <h1 className="text-4xl font-bold">FROM THE COMMUNITY</h1>
    //   </div>

    //   <div className="flex w-full flex-wrap items-center justify-center gap-x-16 lg:w-11/12">
    //     {pics.map((pic, i) => (
    //       <figure
    //         key={i}
    //         className="mb-8 flex w-full flex-col gap-y-2 px-8 md:mb-6 md:w-60 md:px-0 lg:w-80"
    //       >
    //         {/* Image Container */}
    //         <Link href={`#`}>
    //           <div className="w-full max-w-sm">
    //             <Image
    //               src={pic.href}
    //               alt="Picture"
    //               height={500}
    //               width={500}
    //               className="w-full"
    //               priority
    //             />
    //           </div>
    //         </Link>

    //         {/* Caption Container */}
    //         <figcaption className="flex items-center justify-between px-2">
    //           <Link href={`#`} className="flex items-center gap-x-4">
    //             <div className="relative h-6 w-6">
    //               {/* <Image
    //                src={post.profileImage || "/assets/profile-picture.svg"}
    //                alt={JSON.stringify(post._id)}
    //                fill
    //                priority
    //                sizes="100svh"
    //                className="rounded-full object-cover"
    //              /> */}
    //             </div>

    //             <h6 className="text-xs text-[#737373]">{`${pic.createdBy}`}</h6>
    //           </Link>
    //           {/* 
    //          <div className="flex items-center justify-between gap-x-1">
    //            {post.likes.length !== 0 && <p>{post.likes.length}</p>}
    //            <LikeButton post={post} user={user} />
    //          </div> */}
    //         </figcaption>
    //       </figure>
    //     ))}
    //   </div>
    // </div>
  );
};

export default Feed;
