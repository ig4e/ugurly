import Link from "next/link";
import React from "react";
import type { RouteProps } from "./aside-item";

function SheetItem({
  title,
  url,
  icon: Icon,
  onClick,
}: RouteProps & { onClick: () => void }) {
  return (
    <Link
      href={url}
      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
      onClick={onClick}
    >
      {Icon}
      {title}
    </Link>
  );
}

export default SheetItem;
