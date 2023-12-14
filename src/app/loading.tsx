import Container from "@/components/container";
import Spinner from "@/components/spinner";

const Loading = () => {
  return (
    <Container>
      <Spinner />
      <h1 className="text-2xl font-semibold">Loading</h1>
    </Container>
  );
};

export default Loading;
