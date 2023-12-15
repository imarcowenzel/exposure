"use client";

import Container from "@/components/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useRouter } from "next/navigation";
import { FaRegFaceSadTear } from "react-icons/fa6";

const NotFound = () => {
  const router = useRouter();
  return (
    <Container className="h-[768px] md:h-0">
      <div className="flex flex-col items-center justify-center gap-y-4">
        <FaRegFaceSadTear className="text-4xl" />
        <h1 className="text-2xl font-bold">Page not found!</h1>
        <p
          onClick={() => router.back()}
          className={cn(buttonVariants({ variant: "link" }), "cursor-pointer")}
        >
          Go back.
        </p>
      </div>
    </Container>
  );
};

export default NotFound;
