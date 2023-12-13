import { Metadata } from "next";
import Link from "next/link";

import Container from "@/components/container";
import LogInForm from "@/components/forms/log-in";
import GoogleLogInButton from "@/components/google-login-button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "EXPOSURE | Log in",
  description: "A ficctitional website to post photographies",
};

const LogIn = () => {
  return (
    <Container>
      <div className="flex flex-col items-center gap-y-10 md:w-1/2 lg:w-1/3">
        <h1 className="text-xl font-bold">Log in into your account</h1>
        <LogInForm />
        <Link href="/sign-up" className="text-sm font-bold underline">
          or sign up for an account
        </Link>
        <Separator />
        <GoogleLogInButton />
      </div>
    </Container>
  );
};

export default LogIn;
