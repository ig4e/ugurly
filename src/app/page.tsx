import Image from "next/image";
import Link from "next/link";
import { Noise } from "~/components/images";
import { Button } from "~/components/ui/button";
import { H1, P, Lead } from "~/components/ui/typography";
import { getServerAuthSession } from "~/server/auth";
import StatsSection from "./stats-section";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { ArrowRight, ExternalLink } from "lucide-react";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="h-full">
      <div className="absolute inset-0 -z-20 h-full bg-background"></div>
      <div className="absolute inset-x-0 top-0 -z-[10] min-h-[50vh] rounded-b-[50%] bg-gradient-to-b from-rose-500 to-rose-100 opacity-80 blur-3xl dark:from-rose-900 md:min-h-[60vh]" />
      <div
        className="absolute inset-0 -z-[1] mix-blend-overlay"
        style={{
          backgroundRepeat: "repeat",
          backgroundImage: `url('${(Noise as { src: string }).src}')`,
          opacity: 0.1,
        }}
      />
      <div className="relative w-full overflow-hidden">
        <div className="relative px-4 py-10 md:py-16">
          <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-2">
            <section className="flex flex-col justify-center text-start">
              <div className="max-w-2xl">
                <div className="space-y-2">
                  <div className="relative overflow-hidden">
                    {["Your Websites.", "Your Links.", "Blazingly Fast."].map(
                      (text, index) => (
                        <H1 key={index} className={index > 0 ? "mt-1" : ""}>
                          {text}
                        </H1>
                      ),
                    )}
                  </div>
                </div>

                <div>
                  <Lead className="mt-6 text-muted-foreground">
                    Shorten Your URLs, Not Your Possibilities.
                  </Lead>

                  <div className="my-2 flex w-full flex-col items-start justify-start text-start">
                    <P className="my-6 italic text-muted-foreground">
                      &ldquo;The fastest and most reliable URL shortener
                      I&apos;ve ever used.&rdquo;
                      <br />
                      <span className="mt-2 block text-sm">— Happy Mom</span>
                    </P>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Link href={"/dashboard/create"}>
                    <Button
                      size="lg"
                      className="group relative overflow-hidden bg-gradient-to-r from-rose-600 to-rose-500 transition-all duration-300 hover:from-rose-500 hover:to-rose-400"
                    >
                      <span className="relative z-10">Get started</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href={session ? "/dashboard" : "/api/auth/signin"}>
                    <Button
                      variant={"outline"}
                      size="lg"
                      className="border-rose-200 shadow-sm hover:bg-rose-50 dark:border-rose-800 dark:hover:bg-rose-950/30"
                    >
                      {session ? "Dashboard" : "Sign in"}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </section>

            <div className="relative ms-auto h-full w-full max-w-5xl">
              <div className="relative">
                <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-rose-400/20 blur-2xl"></div>
                <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-rose-400/20 blur-3xl"></div>
                <div className="rounded-lg border border-rose-100 bg-white/80 p-3 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:border-rose-900/50 dark:bg-black/70">
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={
                        "https://pub-227df0c783494ba6bf7b3308de901be8.r2.dev/3/4/create_preview_337a79687e.png"
                      }
                      alt="Create Preview"
                      width={1024}
                      height={1024}
                      className="h-full w-full rounded-md object-contain transition-transform duration-500 hover:scale-[1.01]"
                      priority
                    />
                  </AspectRatio>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <StatsSection />
    </main>
  );
}
