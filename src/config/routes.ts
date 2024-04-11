import { Home, Plus, Settings } from "lucide-react";

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
] as const;
