"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { buttonVariants } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export type RouteProps = {
  readonly icon: ReactNode;
  readonly title: string;
  readonly url: string;
  readonly bottom: boolean;
};

export function AsideItem({ title, url, icon: Icon }: RouteProps) {
  const pathname = usePathname();
  const isActive = pathname === url;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={url}
            className={buttonVariants({
              size: "icon",
              variant: isActive ? "secondary" : "ghost",
              className: "h-8 w-8",
            })}
          >
            {Icon}
            <span className="sr-only">{title}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{title}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
