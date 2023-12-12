import { Globe, Search, Send, Smile } from "lucide-react";

type PicsProps = {
    href: string;
    createdBy: string;
}[];

export const pics: PicsProps = [
    {
        href: "/annarodriguez1.jpg",
        createdBy: "Anna Rodriguez"
    },
    {
        href: "/annarodriguez2.jpg",
        createdBy: "Anna Rodriguez"
    },
    {
        href: "/johnsmith1.jpg",
        createdBy: "John Smith"
    },
    {
        href: "/johnsmith2.jpg",
        createdBy: "John Smith"
    },
    {
        href: "/marysantos1.jpg",
        createdBy: "Mary Santos"
    },
    {
        href: "/marysantos2.jpg",
        createdBy: "Mary Santos"
    },
    {
        href: "/peter1.jpg",
        createdBy: "Peter"
    },
    {
        href: "/peter2.jpg",
        createdBy: "Peter"
    },
];

export const menuItems = [
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