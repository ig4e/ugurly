import type { Url } from "@prisma/client";
import bcrypt from "bcrypt-edge";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { libsql } from "./server/db";

export async function middleware(request: NextRequest) {
  const password = request.nextUrl.searchParams.get("password");
  const urlSlug = request.nextUrl.pathname.split("/").pop();
  const homePage = NextResponse.redirect(new URL("/", request.url));

  if (!urlSlug) {
    return homePage;
  }

  const result = await libsql.execute({
    sql: `SELECT * FROM Url WHERE slug = ? OR id = ?;`,
    args: [urlSlug, urlSlug],
  });

  const url = result.rows[0] as unknown as Url | undefined;

  if (url) {
    if (url.maxClicks) {
      if (url.maxClicks <= url.clicks) return homePage;
    }

    if (url.password) {
      if (!password) {
        return NextResponse.redirect(new URL(`/unlock/${url.id}`, request.url));
      }

      if (password) {
        const isMatch = bcrypt.compareSync(password, url.password);
        if (!isMatch)
          return NextResponse.redirect(
            new URL(`/unlock/${url.id}`, request.url),
          );
      }
    }

    // Update the clicks count
    libsql
      .execute({
        sql: `UPDATE Url SET clicks = clicks + 1 WHERE id = ?;`,
        args: [url.id],
      })
      .catch((err) => console.log(err));

    return NextResponse.redirect(new URL(url.url, request.url));
  }

  return homePage;
}

export const config = {
  matcher: "/r/:path*",
};

export const preferredRegion = "cdg1";
