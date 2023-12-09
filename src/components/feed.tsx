import { pics } from "@/config";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

const Feed = () => {
  return (
    <section className="flex flex-col gap-16 px-5 py-16 2xl:px-40">
      <div className="flex items-center gap-x-2">
        <ChevronRight className="h-9 w-9" />
        <h1 className="text-4xl font-bold">FROM THE COMMUNITY</h1>
      </div>
      <div className="grid min-w-0 grid-cols-2 items-center gap-4 antialiased md:grid-cols-3 xl:grid-cols-3">
        {pics.map((pic) => (
          <Image
            key={pic.href}
            src={pic.href}
            alt="Picture"
            height={500}
            width={500}
          />
        ))}
      </div>
    </section>
  );
};

export default Feed;
