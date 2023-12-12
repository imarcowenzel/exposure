"use client";

import { ContrastIcon, Search, Settings } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { menuItems } from "@/config";
import { useState } from "react";

const Sidebar: React.FC = () => {
  const [isLogged, setLogged] = useState<boolean>(false);

  return (
    <nav className="sticky left-0 top-0 z-20 hidden h-screen w-40 flex-col overflow-hidden bg-black text-white lg:flex">
      <div className="mb-24 p-4">
        <Link href="/" className="flex items-center gap-x-2">
          <ContrastIcon className="h-9 w-9" />
          <h1 className="text-sm">EXPOSURE</h1>
        </Link>
      </div>

      <nav className="mb-24 w-full">
        <div className="flex flex-col items-start gap-y-3">
          {menuItems.map((item) => (
            <div
              key={item.label}
              className={buttonVariants({
                variant: "ghost",
                className:
                  "w-full cursor-pointer rounded-none transition duration-500 ease-in-out hover:bg-gray-900 hover:text-white",
              })}
            >
              <Link
                href={item.href}
                className="flex w-full items-center gap-x-2 text-lg"
              >
                {<item.icon className="h-6 w-6" />}
                {item.label}
              </Link>
            </div>
          ))}
        </div>
      </nav>

      {isLogged ? (
        <nav className="mt-auto pb-12 w-full">
          <div className="flex flex-col items-start gap-y-3">
            <div
              className={buttonVariants({
                variant: "ghost",
                className:
                  "w-full cursor-pointer rounded-none transition duration-500 ease-in-out hover:bg-gray-900 hover:text-white",
              })}
            >
              <Link
                href="/search"
                className="flex w-full items-center gap-x-2 text-lg"
              >
                {<Search className="h-6 w-6" />}
                Search
              </Link>
            </div>
            <div
              className={buttonVariants({
                variant: "ghost",
                className:
                  "w-full cursor-pointer rounded-none transition duration-500 ease-in-out hover:bg-gray-900 hover:text-white",
              })}
            >
              <Link
                href="/account"
                className="flex w-full items-center gap-x-2 text-lg"
              >
                {<Settings className="h-6 w-6" />}
                Account
              </Link>
            </div>
          </div>
        </nav>
      ) : (
        <div className="mt-auto px-4 pb-12 text-sm ">
          <div className="flex w-full flex-col gap-y-4">
            <Link
              href="/sign-up"
              className={buttonVariants({ variant: "secondary" })}
            >
              SIGN UP
            </Link>
            <Link
              href="log-in"
              className={buttonVariants({
                variant: "outline",
                className:
                  "bg-black transition duration-500 ease-in-out hover:hover:bg-secondary/80",
              })}
            >
              LOG IN
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Sidebar;
