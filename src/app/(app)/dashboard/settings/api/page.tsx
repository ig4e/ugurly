import { redirect } from "next/navigation";
import React from "react";
import { getServerAuthSession } from "~/server/auth";

async function ApiPage() {
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    redirect("/");
  }

  redirect("/dashboard/settings");
}

export default ApiPage;
