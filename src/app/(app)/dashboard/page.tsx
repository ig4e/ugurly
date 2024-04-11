import { redirect } from "next/navigation";
import React from "react";
import { getServerAuthSession } from "~/server/auth";
import Urls from "./urls";
import { H2 } from "~/components/ui/typography";

async function Home() {
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <div className="space-y-6">
      <H2>My URLS</H2>
      <Urls></Urls>
    </div>
  );
}

export default Home;
