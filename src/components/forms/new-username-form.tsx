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
import { editUsername } from "@/lib/actions/user.actions";
import { UserType } from "@/types";

const formSchema = z.object({
  newUsername: z
    .string()
    .min(3, { message: "New username must be at least 3 characters." })
    .max(15),
});

const NewUsernameForm = ({ user }: {user: UserType}) => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newUsername: user.username
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    const editProfileData = {
      _id: user._id,
      newUsername: values.newUsername || user.username,
    };

    try {
      const res = await editUsername(editProfileData);

      if (!res.success) {
        throw new Error(res.message);
      }

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
        className="flex w-full flex-col gap-y-4"
      >

        <FormField
          control={form.control}
          name="newUsername"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  name="newUsername"
                  aria-label="New Username"
                  placeholder="New username"
                  pattern="^[a-z]+$"
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

export default NewUsernameForm;
