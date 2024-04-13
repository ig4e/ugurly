import Link from "next/link";
import { Noise } from "~/components/images";
import { Button } from "~/components/ui/button";
import { H1, P } from "~/components/ui/typography";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex h-full flex-col items-center">
      <div className="overflow-hidden">
        <div className="bg-background absolute inset-0 -z-20"></div>
        <div className="animate-herobg absolute inset-x-0 top-0 -z-[10] min-h-[40vh] rounded-b-full bg-gradient-to-b from-rose-500 to-red-100 opacity-80 blur-3xl dark:from-rose-900 md:min-h-[60vh]" />
        <div
          className="top-18 absolute inset-0 -z-[1] mix-blend-overlay"
          style={{
            backgroundRepeat: "repeat",
            backgroundImage: `url('${Noise.src}')`,
            opacity: 0.1,
          }}
        />
      </div>
      <section className="pt-32 text-center">
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
