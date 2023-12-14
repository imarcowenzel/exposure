"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import Container from "@/components/container";
import Modal from "@/components/modal";
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
import { deletePost, editPost } from "@/lib/actions/post.actions";
import { PostType, UserType } from "@/types";
import CloseButton from "../close-button";

type EditProps = {
  user: UserType;
  post: PostType;
};

const formSchema = z.object({
  tags: z.string().min(2),
});

const Edit: React.FC<EditProps> = ({ user, post }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);

  const router = useRouter();

  const toggleModal = () => {
    setIsModalOpen((prev: boolean) => !prev);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tags: post.tags.join(","),
    },
  });

  const handleEdit = async () => {
    try {
      setIsEditing(true);

      const editPostData = {
        _id: post._id,
        tags,
      };

      const res = await editPost(editPostData);

      if (!res.success) {
        throw new Error(res.message);
      }

      toast.success(res.message);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsEditing(false);
    }
  };

  const handleDeletePost = async () => {

    const deletePostData = {
      imageKey: post.imageKey,
      _id: user._id,
    };

    try {
      setIsLoading(true);

      const res = await deletePost(deletePostData);

      if (!res?.success) {
        throw new Error(res.message);
      }

      toast.success(res.message);

      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <Container>
      <section className="w-full p-5">
        <CloseButton />

        <div className="flex w-full flex-col items-center gap-y-4 pt-2.5">
          <div className="flex w-full justify-center">
            <Image
              src={post.imageUrl}
              alt={JSON.stringify(post.tags)}
              width={500}
              height={500}
              priority
              className="object-cover lg:w-1/3 lg:px-0"
            />
          </div>

          {/* Post Bottom */}
          <div className="flex w-full flex-col gap-y-2 md:w-2/4 lg:w-1/3">
            <Form {...form}>
              <form
                noValidate
                onSubmit={form.handleSubmit(handleEdit)}
                className="flex flex-col gap-y-4"
              >
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          name="tags"
                          aria-label="Tags"
                          placeholder="Add a tag (separate each tag with a comma)"
                          onChange={({ target: { value } }) => {
                            // Split the input value by commas, trim each tag, and convert to lowercase
                            const tagsArray = value
                              .split(",")
                              .map((tag) => tag.trim().toLowerCase());
                            // Update the 'tags' state with the trimmed and lowercase tags array
                            setTags([...tagsArray]);
                            console.log(tags);
                            field.onChange({ target: { value } });
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button variant={"outline"} className="w-full">
                  Edit
                </Button>
              </form>
            </Form>
          </div>

          <div className="w-full md:w-2/4 lg:w-1/3">
            <Button
              onClick={toggleModal}
              aria-label="Delete Post Button"
              variant={"destructive"}
              className="w-full"
            >
              Delete
            </Button>

            <Modal isOpen={isModalOpen} onClose={toggleModal}>
              <h1 className="text-md mb-4 text-center font-semibold">
                Are you sure? This can`t be undone.
              </h1>
              <div className="flex items-center justify-between gap-x-3">
                <Button
                  onClick={handleDeletePost}
                  variant={"destructive"}
                  className="flex-1"
                >
                  {isLoading ? <Spinner /> : "Yes"}
                </Button>

                <Button
                  onClick={toggleModal}
                  variant={"outline"}
                  className="flex-1"
                >
                  No
                </Button>
              </div>
            </Modal>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Edit;
