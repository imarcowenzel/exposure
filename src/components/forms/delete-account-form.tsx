"use client";

import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import Modal from "@/components/modal";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { deleteAccount, deleteAccountGoogle } from "@/lib/actions/user.actions";
import { DeleteAccountSchema, UserType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

type DeleteAccountFormProps = {
  user: UserType;
};

const formSchema = z.object({ password: z.string() });

const DeleteAccountForm: React.FC<DeleteAccountFormProps> = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen((prev: boolean) => !prev);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const handleDeleteAccount = async (values: z.infer<typeof formSchema>) => {
    try {
      const deleteAccountData = {
        _id: user._id,
        password: values.password,
      };

      const res = await deleteAccount(deleteAccountData);

      if (!res.success) {
        throw new Error(res.message);
      }

      toast.success(res.message);

      signOut({ callbackUrl: "/" });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDeleteAccountGoogle = async () => {
    try {
      const deleteAccountData = {
        _id: user._id,
        googleProvider: user?.googleProvider,
      };

      const res = await deleteAccountGoogle(deleteAccountData);

      toast.success(res.message);

      signOut({ callbackUrl: "/" });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Button onClick={toggleModal} variant={"destructive"} className="w-full">
        Delete my account
      </Button>

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <div className="flex flex-col items-center gap-y-4">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-center text-sm font-semibold">
              Delete my account
            </h1>
            <button onClick={toggleModal} className="text-lg">
              x
            </button>
          </div>

          <Separator />

          <div className="flex flex-col gap-y-4">
            <p className="text-justify text-xs">
              Do you really want to delete your EXPOSURE account? You will no
              longer be able to acccess your profile and your photos will be
              deleted.
            </p>

            {!user.googleProvider && (
              <p className="text-xs font-semibold">
                For your security, please re-enter your password:
              </p>
            )}
          </div>

          <div className="w-full">
            {user.googleProvider ? (
              <div className="flex w-full flex-col items-center gap-y-3">
                <Button
                  onClick={handleDeleteAccountGoogle}
                  variant={"destructive"}
                  disabled={
                    !form.formState.isValid || form.formState.isSubmitting
                  }
                  className="w-full text-xs font-bold"
                >
                  Delete account
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleDeleteAccount)}
                  className="flex  flex-col items-center gap-y-3"
                >
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            name="password"
                            placeholder="Password"
                            aria-label="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    variant={"destructive"}
                    disabled={
                      !form.formState.isValid || form.formState.isSubmitting
                    }
                    className="w-full text-xs font-bold"
                  >
                    {form.formState.isSubmitting ? (
                      <Spinner />
                    ) : (
                      "Delete account"
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteAccountForm;
