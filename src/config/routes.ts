import { Book, Cog, Home, Plus } from "lucide-react";

export const routes = [
  {
    icon: Home,
    title: "Home",
    url: "/dashboard",
    bottom: false,
    external: false,
  },
  {
    icon: Plus,
    title: "Create",
    url: "/dashboard/create",
    bottom: false,
    external: false,
  },
  {
    icon: Book,
    title: "Docs",
    url: "https://ahmed-mohamed-ig4es-projects.vercel.app/en-US/blog/posts/4/ugurly",
    bottom: true,
    external: true,
  },
  {
    icon: Cog,
    title: "Settings",
    url: "/dashboard/settings",
    bottom: true,
    external: false,
  },
] as const;
