import Feed from "@/components/feed";
import { fetchPosts } from "@/lib/actions/post.actions";

const Home: React.FC = async () => {
  const posts = await fetchPosts();

  if ("success" in posts) {
    return (
      <main className="mainContainer mx-auto">
        <h1>No posts yet</h1>
      </main>
    );
  }

  return (
    <div className="w-full">
      <Feed posts={posts} />
    </div>
  );
};

export default Home;
