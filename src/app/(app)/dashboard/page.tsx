import { redirect } from "next/navigation";
import React from "react";
import { getServerAuthSession } from "~/server/auth";
import Urls from "./urls";
import { H2 } from "~/components/ui/typography";
import Link from "next/link";
import { Button } from "~/components/ui/button";

async function Home() {
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <div className="space-y-6">
      <div className="flex w-full items-center justify-between gap-4">
        <H2>My URLS</H2>
        <Link href="/dashboard/create">
          <Button size={"sm"}>Create</Button>
        </Link>
      </div>
      <Urls></Urls>
    </div>
  );
}

export default Home;
