"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createUser } from "@/lib/actions/user.actions";
import { signUpSchema } from "@/lib/validations/user";

const SignUpForm = () => {
  
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    try {
      const res = await createUser(values);

      if (!res.success) {
        throw new Error(res.message);
      }

      await signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl: "/",
      });

      toast.success(res.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  name="email"
                  aria-label="Email"
                  placeholder="Email"
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
                  {...field}
                  type="text"
                  name="username"
                  aria-label="Username"
                  placeholder="Username"
                  pattern="^[a-z]+$"
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
                  {...field}
                  type="password"
                  name="password"
                  aria-label="Password"
                  placeholder="Password"
                  pattern="^(?!\s*$).+"
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
                  {...field}
                  type="password"
                  name="confirmPassword"
                  aria-label="Confirm Password"
                  placeholder="Confirm password"
                  pattern="^(?!\s*$).+"
                  className="rounded-lg border-none bg-[#f6f6f6] p-6"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          name="Sign up"
          aria-label="Sign up"
          disabled={form.formState.isSubmitting || !form.formState.isValid}
          className="w-full py-6"
        >
          {form.formState.isSubmitting ? <Spinner /> : "Sign up"}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
