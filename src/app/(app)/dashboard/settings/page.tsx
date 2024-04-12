import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { H2, H3 } from "~/components/ui/typography";
import { getServerAuthSession } from "~/server/auth";
import ApiKeys from "./api-keys";

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
