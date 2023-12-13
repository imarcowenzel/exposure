import { Globe, LucideIcon, Search, Send, Settings, Smile } from "lucide-react";

interface MenuItem {
  label: string;
  href: string;
  icon: LucideIcon | string;
}

export type MenuItems = Record<
  "default" | "notLogged" | "logged",
 MenuItem[]
>;

export const menuItems: MenuItems = {
  default: [
    {
      label: "Explore",
      href: "/",
      icon: Globe,
    },
    {
      label: "Submit",
      href: "/submit",
      icon: Send,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: Smile,
    },
  ],

  notLogged: [
    {
      label: "Sign up",
      href: "/sign-up",
      icon: "",
    },
    {
      label: "Log in",
      href: "/log-in",
      icon: "",
    },
  ],

  logged: [
    {
      label: "Search",
      href: "/search",
      icon: Search,
    },
    {
      label: "Account",
      href: "/account",
      icon: Settings,
    },
  ],
};

export const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];
