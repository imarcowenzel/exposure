import Container from "@/components/container";
import Spinner from "@/components/spinner";

const Loading = () => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center gap-y-6 md:gap-y-8">
        <Spinner className="h-7 w-7 md:h-8 md:w-8" />
        <h1 className="text-2xl font-bold md:text-3xl">Loading ...</h1>
      </div>
    </Container>
  );
};

export default Loading;
