import { Book, Cog, Home, Plus } from "lucide-react";

export const routes = [
  {
    icon: Home,
    title: "Home",
    url: "/dashboard",
    bottom: false,
  },
  {
    icon: Plus,
    title: "Create",
    url: "/dashboard/create",
    bottom: false,
  },
  {
    icon: Book,
    title: "Docs",
    url: "https://ahmed-mohamed-ig4e.vercel.app/en-US/blog/posts/3/test",
    bottom: true,
    external: true,
  },
  {
    icon: Cog,
    title: "Settings",
    url: "/dashboard/settings",
    bottom: true,
  },
] as const;
