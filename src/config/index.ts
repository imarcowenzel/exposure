import { Globe, LucideIcon, Search, Send, Settings, Smile } from "lucide-react";

export type MenuItemProps = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type MenuItemsProps = MenuItemProps[];

export const menuItems: MenuItemsProps = [
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
];

export const menuItemsMobile: MenuItemsProps = [
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
];

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
