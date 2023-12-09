"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { ContrastIcon, Globe, Search, Smile } from "lucide-react";
import { buttonVariants } from "./ui/button";

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {
      label: "Explore",
      href: "/",
      icon: Globe,
    },
    {
      label: "Search",
      href: "/search",
      icon: Search,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: Smile,
    },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-black lg:hidden">
      <NavbarContent>
        <NavbarBrand>
          <ContrastIcon size={36} color="#fff" />
        </NavbarBrand>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="text-white sm:hidden"
        />
      </NavbarContent>

      <NavbarMenu className="bg-black px-6 pt-12">
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.label}>
            <Link
              className="flex items-center gap-x-3 pb-10 text-3xl font-semibold tracking-widest text-white"
              href={item.href}
            >
              {<item.icon />}
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}

        <NavbarMenuItem className="pt-12">
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
                className: "bg-black text-white hover:hover:bg-secondary/80",
              })}
            >
              LOG IN
            </Link>
          </div>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default MobileNavbar;
