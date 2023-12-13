import Container from "@/components/container";
import Feed from "@/components/feed";
import { fetchPosts } from "@/lib/actions/post.actions";

const Home: React.FC = async () => {
  const posts = await fetchPosts();

  if ("success" in posts) {
    return (
      <Container>
        <h1 className="text-3xl">No posts yet!</h1>
      </Container>
    );
  }

  return <Feed posts={posts} />;
};

export default Home;
