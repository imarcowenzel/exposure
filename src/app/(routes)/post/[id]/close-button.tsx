"use client";

import { useRouter } from "next/navigation";

const CloseButton = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label="Close Button"
      className="right-0 text-xl"
    >
      X
    </button>
  );
};

export default CloseButton;
