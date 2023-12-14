"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { changePassword } from "@/lib/actions/user.actions";
import { changePasswordSchema } from "@/lib/validations/user";
import { UserType } from "@/types";

type ChangePasswordFormProps = {
  user: UserType;
};

const formSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, { message: "Current password must be at least 6 characters." }),
    newPassword: z
      .string()
      .min(6, { message: "New password must be at least 6 characters." }),
    confirmPassword: z.string().min(6, {
      message: "Password confirmation must be at least 6 characters.",
    }),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "Password confirmation does not match the new password.",
    path: ["confirmPassword"],
  });

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ user }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof changePasswordSchema>) => {
    const passwordChangedata = {
      _id: user._id,
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    };

    try {
      const res = await changePassword(passwordChangedata);

      if (!res.success) {
        throw new Error(res.message);
      }

      toast.success(res.message);
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
        className="flex w-full flex-col gap-y-4"
      >
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  name="currentPassword"
                  aria-label="Current Password"
                  placeholder="Current Password"
                  pattern="^(?!\s*$).+"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  name="newPassword"
                  aria-label="New Password"
                  placeholder="New Password"
                  pattern="^(?!\s*$).+"
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
                  placeholder="Confirm Password"
                  pattern="^(?!\s*$).+"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant={"outline"}>Save changes</Button>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
