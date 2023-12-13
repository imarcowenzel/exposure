import { CircleOff } from "lucide-react";

const NotFound: React.FC = () => {
  return (
    <main className="flex min-h-[calc(100svh-384px)] w-full flex-col items-center justify-center gap-y-5 py-12 md:min-h-[calc(100svh-256px)]">
      <CircleOff className="text-9xl" />
      <h1 className="text-2xl font-semibold">Page Not Found :(</h1>
    </main>
  );
};

export default NotFound;
