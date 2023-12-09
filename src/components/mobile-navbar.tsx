"use client";

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from "@nextui-org/react";
import { ContrastIcon, Globe, Search, Smile } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
          <ContrastIcon className="h-8 w-8 text-white" />
        </NavbarBrand>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="text-white sm:hidden"
        />
      </NavbarContent>

      <NavbarMenu className="bg-black px-5 pt-10">
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.label}>
            <Link
              className="flex items-center gap-x-4 pb-4 text-3xl text-white"
              href={item.href}
            >
              {<item.icon className="h-6 w-6" />}
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default MobileNavbar;
