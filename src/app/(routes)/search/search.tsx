"use client";

import { Button } from "@/components/ui/button";
import { FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
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
    <div className="flex min-h-[calc(100dvh-497px)] w-full flex-col items-center justify-center gap-y-10 py-12 px-6 md:min-h-[calc(100dvh-321px)] lg:min-h-[calc(100dvh-256.98px)]">

      <div className="flex w-full flex-col items-center justify-center gap-y-8">

        <div className="w-full flex justify-center items-center flex-col gap-y-2">

          <Form {...form} className="w-full">
            <form className="w-full flex justify-between md:w-3/4">

              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem>
                    <Input
                      formNoValidate
                      placeholder="Search by tag or author"
                      {...field}
                      className="w-full border-none bg-transparent p-3 focus-visible:ring-0 focus-visible:ring-transparent text-lg"
                    />
                  </FormItem>
                )}
              />

              <Button variant={"ghost"} className="hover:bg-transparent">
                <SearchIcon className="text-xl" />
              </Button>

            </form>
          </Form>

          <Separator className="flex justify-center" />

        </div>

        {/*{searchResults && <SearchResult posts={searchResults} />} */}
      </div>


    </div>
  );
};

export default Search;
