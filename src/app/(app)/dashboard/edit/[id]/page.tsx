import { redirect } from "next/navigation";
import React from "react";
import { H2 } from "~/components/ui/typography";
import { getServerAuthSession } from "~/server/auth";
import { UrlForm } from "./form";
import { api } from "~/trpc/server";

async function EditUrl({ params }: { params: { id: string } }) {
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    redirect("/");
  }

  const url = await api.url.get({ id: params.id });

  return (
    <div className="space-y-6">
      <H2>Edit URL</H2>
      <UrlForm
        id={url.id}
        url={url.url}
        maxClicks={url.maxClicks ?? undefined}
        password={url.password ?? undefined}
        slug={url.slug ?? undefined}
      />
    </div>
  );
}

export default EditUrl;
