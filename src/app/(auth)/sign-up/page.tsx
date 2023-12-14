import { Metadata } from "next";
import Link from "next/link";

import Container from "@/components/container";
import SignUpForm from "@/components/forms/sign-up-form";
import GoogleLogInButton from "@/components/google-login-button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "EXPOSURE | Sign up",
  description: "A ficctitional website to post photographies",
};

const SignUp = () => {
  return (
    <Container>
      <div className="flex w-11/12 flex-col items-center gap-y-10 md:w-1/2 lg:w-1/3">
        <h1 className="text-xl font-bold">Sign up for an account</h1>
        <SignUpForm />
        <Link href="/log-in" className="text-sm font-bold underline">
          or log in into your account
        </Link>
        <Separator />
        <GoogleLogInButton />
        <p className="text-xs">
          By signing up, you agree to EXPOSURES's{" "}
          <Link href="#" className="font-bold">
            Terms of Use & Privacy Policy
          </Link>
        </p>
      </div>
    </Container>
  );
};

export default SignUp;
