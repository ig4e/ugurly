import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { H2 } from "~/components/ui/typography";
import { getServerAuthSession } from "~/server/auth";
import Urls from "./urls";
import { api } from "~/trpc/server";

async function Home() {
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    redirect("/");
  }

  const urls = await api.url.getUrls({});

  return (
    <div className="space-y-6">
      <div className="flex w-full items-center justify-between gap-4">
        <H2>My URLS</H2>
        <Link href="/dashboard/create">
          <Button size={"sm"}>Create</Button>
        </Link>
      </div>
      <Urls initialData={urls} />
    </div>
  );
}

export default Home;
