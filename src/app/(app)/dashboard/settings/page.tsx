import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { H2, H3 } from "~/components/ui/typography";
import { getServerAuthSession } from "~/server/auth";
import ApiKeys from "./api-keys";
import { api } from "~/trpc/server";

async function Home() {
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    redirect("/");
  }

  const apiKeys = await api.key.getMany({});

  return (
    <div className="space-y-6">
      <H2>My Settings</H2>
      <div className="flex w-full items-center justify-between gap-4">
        <H3>My API keys</H3>
        <Link href="/dashboard/settings/api/create">
          <Button size={"sm"}>Create</Button>
        </Link>
      </div>
      <ApiKeys initialData={apiKeys} />
    </div>
  );
}

export default Home;
