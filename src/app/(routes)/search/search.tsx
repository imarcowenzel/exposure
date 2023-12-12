"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { Form, useForm } from "react-hook-form";
import { AiOutlineSearch as SearchIcon } from "react-icons/ai";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { pics } from "@/config";

const formSchema = z.object({
  query: z.string().min(1, {
    message: "Seach must be at least 1 characters.",
  }),
});

const Search: React.FC = () => {
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

        {!pics && (
          <div className="flex w-full justify-center">
            <p className="text-xl">No results found!</p>
          </div>
        )}

        <div className="grid grid-cols-2 items-center justify-start gap-x-6 gap-y-6 px-6 md:grid-cols-4 md:gap-x-8 lg:grid-cols-5">
          {pics &&
            pics.length > 0 &&
            pics.map((pic, i) => (
              <figure key={i} className="flex flex-col gap-y-2">
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
            ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
