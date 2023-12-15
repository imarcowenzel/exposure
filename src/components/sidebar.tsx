import { ContrastIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { buttonVariants } from "@/components/ui/button";
import { menuItems } from "@/config";

const Sidebar = async () => {
  
  const session = await getServerSession(authOptions);

  return (
    <aside className="sticky left-0 top-0 z-20 hidden h-screen w-40 flex-col overflow-hidden bg-black text-white lg:flex">
      {/* Logo and brand title */}
      <div className="mb-24 p-4">
        <Link href="/" className="flex items-center gap-x-2">
          <ContrastIcon className="h-9 w-9" />
          <h1 className="text-sm">EXPOSURE</h1>
        </Link>
      </div>

      {/* Navigation for default menu items */}
      <nav className="mb-24 w-full">
        <div className="flex flex-col items-start gap-y-3">
          {/* Map through default menu items and create navigation links */}
          {menuItems.default.map((item) => (
            <div
              key={item.label}
              className={buttonVariants({
                variant: "ghost",
                className:
                  "w-full cursor-pointer rounded-none transition-all duration-500 ease-in-out hover:bg-gray-900 hover:text-white",
              })}
            >
              <Link
                href={
                  item.label === "Profile"
                    ? `/profile/${session?.user._id}`
                    : item.href
                }
                className="flex w-full items-center gap-x-2 text-lg"
              >
                {<item.icon className="h-6 w-6" />}
                {item.label}
              </Link>
            </div>
          ))}
        </div>
      </nav>

      {/* Conditional navigation based on user session */}
      {session ? (
        <nav className="mt-auto w-full pb-12">
          <div className="flex flex-col items-start gap-y-3">
            {/* Map through logged-in menu items and create navigation links */}
            {menuItems.logged.map((item) => (
              <div
                key={item.label}
                className={buttonVariants({
                  variant: "ghost",
                  className:
                    "w-full cursor-pointer rounded-none transition-all duration-500 ease-in-out hover:bg-gray-900 hover:text-white",
                })}
              >
                <Link
                  href={
                    item.label === "Account"
                      ? `/account/${session?.user._id}`
                      : item.href
                  }
                  className="flex w-full items-center gap-x-2 text-lg"
                >
                  {item.icon && <item.icon className="h-6 w-6" />}
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
        </nav>
      ) : (
        <nav className="mt-auto px-4 pb-12">
          <div className="flex w-full flex-col gap-y-4">
            {/* Map through not-logged-in menu items and create navigation links */}
            {menuItems.notLogged.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={
                  item.label === "Log in"
                    ? buttonVariants({
                        variant: "outline",
                        className:
                          "bg-black transition-all duration-500 ease-in-out hover:hover:bg-secondary/80",
                      })
                    : buttonVariants({ variant: "secondary" })
                }
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </aside>
  );
};

export default Sidebar;
