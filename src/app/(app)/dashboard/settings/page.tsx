import { redirect } from "next/navigation";
import React from "react";
import { getServerAuthSession } from "~/server/auth";
import { H2, H3, H4 } from "~/components/ui/typography";
import ApiKeys from "./api-keys";
import { Button } from "~/components/ui/button";
import Link from "next/link";

async function Home() {
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <div className="space-y-6">
      <H2>My Settings</H2>
      <div className="flex w-full items-center justify-between gap-4">
        <H3>My API keys</H3>
        <Link href="/dashboard/settings/api/create">
          <Button size={"sm"}>Create</Button>
        </Link>
      </div>
      <ApiKeys />
    </div>
  );
}

export default Home;
