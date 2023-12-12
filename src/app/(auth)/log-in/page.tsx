"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const formSchema = z
  .object({
    email: z
      .string()
      .min(5)
      .email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
  });

const LogIn = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: log-in routine
    console.log(values);
  }

  return (
    <div className="flex items-center justify-center px-9 pb-20 pt-10">

      <div className="flex flex-col items-center gap-y-10 md:w-1/2 lg:w-1/3">

        <div>
          <h1 className="text-xl font-bold">Log in into your account</h1>
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
              <Button
                disabled={
                  form.formState.isSubmitting || !form.formState.isValid
                }
                className="w-full py-6"
              >
                {/* TODO: progress component */}
                LOG IN
              </Button>
            </form>
          </Form>
        </div>

        <div>
          <Link href="/sign-up" className="text-sm font-bold underline">
            or sign up for an account.
          </Link>
        </div>

        <Separator />

        <div className="w-full">
          <Button className="flex w-full gap-x-2 py-6">
            <GoogleIcon size={24} />
            Google
          </Button>
        </div>
      </div>
      
    </div>
  );
};

export default LogIn;
