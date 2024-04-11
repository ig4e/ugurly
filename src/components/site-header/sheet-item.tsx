import Link from "next/link";
import React from "react";
import type { RouteProps } from "./aside-item";

function SheetItem({ title, url, icon: Icon }: RouteProps) {
  return (
    <Link
      href={url}
      className="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
    >
      {Icon}
      {title}
    </Link>
  );
}

export default SheetItem;
