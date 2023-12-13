import Spinner from "@/components/spinner";

const Loading = () => {
  return (
    <main className="flex min-h-[calc(100dvh-497px)] w-full flex-col items-center justify-center gap-y-3 py-12 md:min-h-[calc(100dvh-321px)] lg:min-h-[calc(100dvh-256.98px)]">
      <Spinner />
      <h1 className="text-2xl font-semibold">Loading</h1>
    </main>
  );
};

export default Loading;
