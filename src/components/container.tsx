import { ReactNode } from "react";

import { cn } from "@/lib/utils";

const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={cn(
        "flex min-h-[calc(100dvh-497px)] w-full flex-col items-center justify-center gap-y-10 py-12 md:min-h-[calc(100dvh-321px)] lg:min-h-[calc(100dvh-256.98px)]",
        className,
      )}
    >
      {children}
    </section>
  );
};

export default Container;
