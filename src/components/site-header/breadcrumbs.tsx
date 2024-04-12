"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname?.split("/").filter(Boolean) ?? [];

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={"/"}>
              <span className="first-letter:uppercase">Ugurly</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        {segments.length <= 0 && (
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <BreadcrumbPage className="first-letter:uppercase">
                Home
              </BreadcrumbPage>
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}

        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const fullSegementPath = segments.slice(0, index + 1).join("/");
          const Component = isLast ? BreadcrumbPage : Link;

          return (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Component
                    href={"/" + fullSegementPath}
                    className="first-letter:uppercase"
                  >
                    {segment}
                  </Component>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default Breadcrumbs;
