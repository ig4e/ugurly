import React from "react";
import { H2, H3, P } from "~/components/ui/typography";
import { api } from "~/trpc/server";
import { BarChart3, Link as LinkIcon, Users, Code } from "lucide-react";

export const revalidate = 60 * 60 * 10;

async function StatsSection() {
  const stats = await api.stats.get();
  const formatter = Intl.NumberFormat("en-US", { maximumSignificantDigits: 3 });

  const statsTemplate = [
    {
      title: "Total Clicks",
      value: formatter.format(stats.urls.totalClicks),
      icon: BarChart3,
      description: "Tracked clicks and counting"
    },
    {
      title: "Short Links",
      value: formatter.format(stats.urls.total),
      icon: LinkIcon,
      description: "Created and counting"
    },
    {
      title: "Happy Users",
      value: formatter.format(stats.users.total),
      icon: Users,
      description: "Using our service"
    },
    {
      title: "Developers",
      value: formatter.format(stats.api.total),
      icon: Code,
      description: "Using our APIs"
    }
  ];

  return (
    <div className="w-full py-16 bg-gradient-to-b from-background to-accent/5">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <H2 className="text-3xl md:text-4xl">
            Mom-Approved Stats
          </H2>
          <P className="text-muted-foreground max-w-xl mx-auto mt-2">
            Numbers that would make any mother proud! Our platform connects people faster than moms sharing family recipes.
          </P>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsTemplate.map((stat, index) => (
            <div 
              key={stat.title} 
              className="group flex flex-col items-center justify-center rounded-lg border bg-background p-6 text-center transition-all duration-300 hover:shadow-md"
            >
              <div className="rounded-full bg-rose-500/10 p-3 mb-4">
                <stat.icon className="h-8 w-8 text-rose-500" />
              </div>
              <div>
                <H3 className="text-3xl font-bold">
                  {stat.value}
                </H3>
                <P className="font-medium text-lg">{stat.title}</P>
                <P className="text-sm text-muted-foreground mt-1">{stat.description}</P>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StatsSection;
