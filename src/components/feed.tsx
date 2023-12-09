import { pics } from "@/config";
import {
  ChevronRight
} from "lucide-react";
import Image from "next/image";

const Feed = () => {
  return (
    <section className="px-11 flex flex-col gap-16 2xl:px-40 py-16">
      <div className="flex items-center gap-x-2">
        <ChevronRight className="h-9 w-9" />
        <h1 className="text-4xl font-bold">FROM THE COMMUNITY</h1>
      </div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-20">
        {pics.map((pic) => (
          <Image
            key={pic.href}
            src={pic.href}
            alt="Picture"
            height={500}
            width={500}
            className="max-w-sm"
          />
        ))}
      </div>
    </section>
  );
};

export default Feed;
