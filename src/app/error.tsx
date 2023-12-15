"use client";

import { useEffect } from "react";

import Container from "@/components/container";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Container className="h-[600px] md:h-0">
      <h1 className="text-2xl font-semibold">Something went wrong!</h1>
    </Container>
  );
};

export default Error;
