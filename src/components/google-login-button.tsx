"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { FcGoogle as GoogleIcon } from "react-icons/fc";

import { Button } from "@/components/ui/button";

const GoogleLogInButton = () => {
  const router = useRouter();

  const logInWithGoogle = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
      toast.success("Sign in successful!");
    } catch (error) {
      console.log(error);
      toast.success("Sign in failed!");
      router.refresh;
    }
  };

  return (
    <Button
      type="button"
      onClick={logInWithGoogle}
      className="flex w-full gap-x-2 py-6"
    >
      <GoogleIcon size={24} />
      Google
    </Button>
  );
};

export default GoogleLogInButton;
