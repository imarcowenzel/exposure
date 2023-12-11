"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { CircularProgress } from "@nextui-org/react";

const formSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters." })
      .max(15),
    email: z
      .string()
      .min(5)
      .email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string().min(6, {
      message: "Password confirmation must be at least 6 characters.",
    }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Password confirmation does not match the password.",
    path: ["confirmPassword"],
  });

const SignUp = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: sign-up routine
    console.log(values);
  }

  return (
    <div className="flex flex-col items-center gap-y-10 px-9 pb-20 pt-10">
      <div>
        <h1 className="text-xl font-bold">Sign up for an account</h1>
      </div>

      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      {...field}
                      className="rounded-lg border-none bg-[#f6f6f6] p-6"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Username"
                      {...field}
                      className="rounded-lg border-none bg-[#f6f6f6] p-6"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      {...field}
                      className="rounded-lg border-none bg-[#f6f6f6] p-6"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm password"
                      {...field}
                      className="rounded-lg border-none bg-[#f6f6f6] p-6"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={form.formState.isSubmitting || !form.formState.isValid}
              className="w-full py-6"
            >
              {/* TODO: progress component */}
              Sign up
            </Button>
          </form>
        </Form>
      </div>

      <div>
        <Link href="/log-in" className="text-sm font-bold underline">
          or login into your account.
        </Link>
      </div>

      <Separator />

      <div className="w-full">
        <Button className="flex w-full gap-x-2 py-6">
          <GoogleIcon size={24} />
          Sign in with Google
        </Button>
      </div>

      <div>
        <p className="text-xs">
          By signing up, you agree to EXPOSURES's{" "}
          <Link href="#" className="font-bold">
            Terms of Use & Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
