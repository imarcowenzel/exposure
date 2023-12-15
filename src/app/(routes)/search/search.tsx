"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineSearch as SearchIcon } from "react-icons/ai";
import { toast } from "sonner";
import * as z from "zod";

import Container from "@/components/container";
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
import { Separator } from "@/components/ui/separator";
import { fetchPostsByTagOrAuthor } from "@/lib/actions/post.actions";
import { PostType } from "@/types";

const formSchema = z.object({
  query: z.string().min(1, {
    message: "Seach must be at least 1 characters.",
  }),
});

const Search = () => {

  const [searchResults, setSearchResults] = useState<PostType[] | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  const handleSearch = async (value: z.infer<typeof formSchema>) => {
    try {
      const res = await fetchPostsByTagOrAuthor(value.query.toLowerCase());

      if ("success" in res) {
        throw new Error(res.message);
      }

      setSearchResults(res);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      if (form.reset) form.reset();
    }
  };

  return (
    <Container className="h-[768px] md:h-0">
      <div className="flex w-full flex-col items-center gap-y-16">
        <div className="flex w-11/12 flex-col items-center justify-center gap-y-2 md:w-10/12 lg:w-1/2">
          <Form {...form}>
            <form
              noValidate
              onSubmit={form.handleSubmit(handleSearch)}
              className="flex w-full justify-between"
            >
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        name="query"
                        aria-label="Query"
                        placeholder="Search by tag or author"
                        className="w-full border-none bg-transparent p-3 text-lg focus-visible:ring-0 focus-visible:ring-transparent md:text-2xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button variant={"ghost"} className="hover:bg-transparent">
                {!form.formState.isSubmitting ? (
                  <SearchIcon className="text-2xl" />
                ) : (
                  <Spinner />
                )}
              </Button>
            </form>
          </Form>

          <Separator className="flex justify-center" />
        </div>

        {searchResults?.length === 0 && (
          <div className="flex items-center justify-center">
            <h1>No results found for your search.</h1>
          </div>
        )}

        {searchResults && searchResults.length > 0 && (
          <div className="grid grid-cols-2 items-center justify-center gap-x-6 gap-y-8 px-6 md:grid-cols-3 md:gap-x-6 md:gap-y-20 md:px-16 2xl:grid-cols-5 2xl:px-24">
            {searchResults.map((post) => (
              <figure
                key={JSON.stringify(post._id)}
                className="flex flex-col gap-y-2"
              >
                <Link href={`/post/${post._id}`}>
                  <Image
                    src={post.imageUrl}
                    priority
                    alt={`${post.createdBy}\`s post`}
                    loading="eager"
                    height={400}
                    width={400}
                  />
                </Link>

                {/* Caption Container */}
                <figcaption className="flex items-center justify-between px-2">
                  <Link
                    href={`/profile/${post.userId}`}
                    className="flex items-center gap-x-4"
                  >
                    <div className="relative h-6 w-6">
                      <Image
                        src={post.profileImage || "/assets/profile-picture.svg"}
                        alt={`${post.createdBy}\`s profile picture`}
                        fill
                        priority
                        sizes="100svh"
                        className="rounded-full object-cover"
                      />
                    </div>

                    <p className="text-xs text-[#737373]">{`${post.createdBy}`}</p>
                  </Link>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Search;
