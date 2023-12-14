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
import { logInSchema } from "@/lib/validations/user";

const LogInForm = () => {

  const form = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof logInSchema>) => {
    const { email, password } = values;

    try {
      const res = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
      });

      if (res?.error) {
        throw new Error(res.error);
      }

      toast.success("Sign in successfully!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      form.reset();
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
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  name="email"
                  aria-label="email"
                  placeholder="Email"
                  className="rounded-lg border-none bg-[#f6f6f6] p-6"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  name="password"
                  aria-label="Password"
                  placeholder="Password"
                  className="rounded-lg border-none bg-[#f6f6f6] p-6"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          name="Log in"
          aria-label="Log in"
          disabled={form.formState.isSubmitting || !form.formState.isValid}
          className="w-full py-6"
        >
          {form.formState.isSubmitting ? (
            <div className="flex items-center gap-x-2">
              <Spinner />
            </div>
          ) : (
            "Log in"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LogInForm;
