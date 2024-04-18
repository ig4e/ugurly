import React from "react";
import { H2, H3, P } from "~/components/ui/typography";
import { api } from "~/trpc/server";

export const revalidate = 60 * 60 * 4;

async function StatsSection() {
  const stats = await api.stats.get();
  const formatter = Intl.NumberFormat("en-US", { maximumSignificantDigits: 3 });

  const statsTemplate = [
    {
      title: "Clicks tracked each month",
      value: formatter.format(stats.urls.totalClicks),
    },
    {
      title: "Short links created and counting",
      value: formatter.format(stats.urls.total),
    },
    {
      title: "Happy users using our Service",
      value: formatter.format(stats.users.total),
    },
    {
      title: "Developers using our APIs",
      value: formatter.format(stats.api.total),
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 justify-between gap-8 pt-10 md:pt-32 lg:grid-cols-2">
      <div>
        <H2 className="text-2xl md:text-3xl">
          Don’t just take our word for it
        </H2>
        <P>You kinda have to take it, Rated 10/10 by myself and my mom.</P>
      </div>

      <div className="grid w-full grid-cols-2 gap-4">
        {statsTemplate.map((stat) => (
          <div
            key={stat.title}
            className="grid place-items-center rounded-md border bg-accent/25 p-6 text-center"
          >
            <div className="max-w-52">
              <H3>{stat.value}</H3>
              <P className="break-before-all text-lg [&:not(:first-child)]:mt-2">
                {stat.title}
              </P>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatsSection;
