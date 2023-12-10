import { CircleOff, XCircleIcon } from "lucide-react";
import React from "react";

const NotFound = () => {
  return (
    <main className="flex gap-y-5 min-h-[calc(100svh-384px)] w-full flex-col items-center justify-center py-12 md:min-h-[calc(100svh-256px)]">
      <CircleOff className="text-9xl" />
      <h1 className="text-2xl font-semibold">Page Not Found :(</h1>
    </main>
  );
};

export default NotFound;
