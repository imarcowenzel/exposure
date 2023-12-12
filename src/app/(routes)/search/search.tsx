"use client";

import { Button } from "@/components/ui/button";
import { FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { pics } from "@/config";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Form, useForm } from "react-hook-form";
import { AiOutlineSearch as SearchIcon } from "react-icons/ai";
import * as z from "zod";

const formSchema = z.object({
  query: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const Search = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  return (
    <div className="flex min-h-[calc(100dvh-497px)] w-full flex-col items-center justify-center gap-y-10 py-12 md:min-h-[calc(100dvh-321px)] lg:min-h-[calc(100dvh-256.98px)]">
      <div className="flex w-full flex-col items-center justify-center gap-y-16 ">
        <div className="flex w-11/12 flex-col items-center justify-center gap-y-2 md:w-10/12 lg:w-1/2">
          <Form {...form} className="w-full">
            <form className="flex w-full justify-between">
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem>
                    <Input
                      formNoValidate
                      placeholder="Search by tag or author"
                      {...field}
                      className="w-full border-none bg-transparent p-3 text-lg focus-visible:ring-0 focus-visible:ring-transparent md:text-2xl"
                    />
                  </FormItem>
                )}
              />

              <Button variant={"ghost"} className="hover:bg-transparent">
                <SearchIcon className="text-2xl" />
              </Button>
            </form>
          </Form>

          <Separator className="flex justify-center" />
        </div>

        <div className="grid grid-cols-2 items-center justify-start gap-x-6 gap-y-6 px-6 md:grid-cols-4 md:gap-x-8 lg:grid-cols-5">
          {pics && pics.length > 0 ? (
            pics.map((pic, i) => (
              <figure
                key={JSON.stringify(i)}
                className="flex flex-col gap-y-2"
              >
                <Link href={`#`}>
                  <Image
                    src={pic.href}
                    priority
                    alt="Picture"
                    loading="eager"
                    height={500}
                    width={500}
                  />
                </Link>
              </figure>
            ))
          ) : (
            <p className="w-full text-center text-xl">No results found!</p>
          )}
        </div>

        {/*{searchResults && <SearchResult posts={searchResults} />} */}
        {/* <div className="flex flex-wrap items-center justify-start gap-x-6 gap-y-8 px-6">
          {pics && pics.length > 0 ? (
            pics.map((pic, i) => (
              <figure
                key={JSON.stringify(i)}
                className="flex w-full max-w-[171px] flex-col gap-y-2 md:max-w-[144px] md:px-0 lg:max-w-[205px]"
              >
                <Link
                  href={`#`}
                  className="max-w-[171px] md:max-w-[144px] lg:max-w-[205px]"
                >
                  <Image
                    src={pic.href}
                    priority
                    alt="Picture"
                    loading="eager"
                    height={500}
                    width={500}
                    className="w-full"
                  />
                </Link>
              </figure>
            ))
          ) : (
            <p className="w-full text-center text-xl">No results found!</p>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Search;
