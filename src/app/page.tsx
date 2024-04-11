import Link from "next/link";
import { Button } from "~/components/ui/button";
import { H1, P } from "~/components/ui/typography";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex h-full flex-col items-center">
      <div className="from-primary/80 dark:from-primary/40 to-background absolute inset-0 -z-10 h-full min-h-screen bg-gradient-to-b"></div>
      <section className="pt-52 text-center">
        <H1>Your Go To URL-Shortener</H1>
        <P>
          Shorten Your URLs, Not Your Possiblities. (yEAH THATS BAD) <br />
          What&apos;re ya waitin&apos; for?
        </P>
      </section>

      <div className="mt-8 flex items-center gap-4">
        <Link href={"/dashboard/create"}>
          <Button>Get started</Button>
        </Link>
        <Link href={session ? "/dashboard" : "/api/auth/signin"}>
          <Button variant={"secondary"}>
            {session ? "Dashboard" : "Sign in"}
          </Button>
        </Link>
      </div>
    </main>
  );
}
