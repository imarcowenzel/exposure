import Gallery from "@/components/gallery";
import User from "@/components/user";

const Profile = ({ params }: { params: { id: string } }) => {
  return (
    <main className="flex min-h-[calc(100dvh-497px)] w-full flex-col items-center justify-center gap-y-10 py-12 md:min-h-[calc(100dvh-321px)] lg:min-h-[calc(100dvh-256.98px)]">
      <section className="h-full w-full">
        <User />
      </section>

      <section className="flex gap-x-4">
        <h2 className="bg-black px-4 py-1 text-white">Gallery</h2>
      </section>
      <Gallery />
    </main>
  );
};

export default Profile;
