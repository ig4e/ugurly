import React from "react";
import { H2 } from "~/components/ui/typography";
import { UrlForm } from "./form";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";

async function Create() {
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <div className="space-y-6">
      <H2>Create API Key</H2>
      <UrlForm></UrlForm>
    </div>
  );
}

export default Create;
