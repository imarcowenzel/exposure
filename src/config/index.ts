import { Globe, LucideIcon, Search, Send, Settings, Smile } from "lucide-react";

export interface SidebarMenuItem {
  label: string;
  href: string;
  icon: LucideIcon | string;
}

export type SidebarMenuItems = Record<
  'default' | 'notLogged' | 'logged',
  SidebarMenuItem[]
>;

export const sidebarMenuItems: SidebarMenuItems = {
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

export const menuItemsMobile = [
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
