import Image from "next/image";
import Link from "next/link";
import { Noise } from "~/components/images";
import { Button } from "~/components/ui/button";
import { H1, P } from "~/components/ui/typography";
import { getServerAuthSession } from "~/server/auth";
import StatsSection from "./stats-section";
import { AspectRatio } from "~/components/ui/aspect-ratio";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="mx-2 flex h-full flex-col items-center pb-16 md:pb-32 lg:container">
      <div>
        <div className="absolute inset-0 -z-20 h-full bg-background"></div>
        <div className="absolute inset-x-0 top-0 -z-[10] min-h-[40vh] rounded-b-full bg-gradient-to-b from-rose-500 to-red-100 opacity-80 blur-3xl dark:from-rose-900 md:min-h-[60vh]" />
        <div
          className="top-18 absolute inset-0 -z-[1] mix-blend-overlay"
          style={{
            backgroundRepeat: "repeat",
            backgroundImage: `url('${Noise.src}')`,
            opacity: 0.1,
          }}
        />
      </div>

      <div className="grid w-full grid-cols-1 justify-between gap-8 pt-10 md:pt-16 lg:grid-cols-2">
        <section className="flex flex-col justify-between text-start">
          <div>
            <div className="space-y-4">
              <H1>Your Websites.</H1>
              <H1>Your links.</H1>
              <H1>Blazingly fast.</H1>
            </div>

            <P>
              Shorten Your URLs, Not Your Possiblities. (yEAH THATS BAD) <br />
              What&apos;re ya waitin&apos; for?
            </P>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <Link href={"/dashboard/create"}>
              <Button>Get started</Button>
            </Link>
            <Link href={session ? "/dashboard" : "/api/auth/signin"}>
              <Button variant={"secondary"}>
                {session ? "Dashboard" : "Sign in"}
              </Button>
            </Link>
          </div>
        </section>

        <div className="ms-auto h-full w-full max-w-5xl rounded-md border bg-background/50 p-2.5">
          <AspectRatio ratio={16 / 9}>
            <Image
              src={
                "https://pub-227df0c783494ba6bf7b3308de901be8.r2.dev/3/4/create_preview_337a79687e.png"
              }
              alt="Create Preview"
              width={1024}
              height={1024}
              className="h-full w-full rounded-md"
              priority
            />
          </AspectRatio>
        </div>
      </div>

      <StatsSection />
    </main>
  );
}
