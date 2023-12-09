import Feed from "@/components/feed";
import SwiperPage from "@/components/swiper";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <SwiperPage />
      <Feed />
    </div>
  );
}
