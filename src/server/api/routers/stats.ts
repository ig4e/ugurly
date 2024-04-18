import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const statsRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    const [usersStats, urlsStats, apiStats] = await Promise.all([
      ctx.db.user.aggregate({
        _count: true,
      }),
      ctx.db.url.aggregate({
        _count: true,
        _sum: {
          clicks: true,
        },
      }),
      ctx.db.key.aggregate({
        _count: true,
      }),
    ]);

    return {
      users: {
        total: usersStats._count ?? 0,
      },
      urls: {
        total: urlsStats._count ?? 0,
        totalClicks: urlsStats._sum.clicks ?? 0,
      },
      api: {
        total: apiStats._count ?? 0,
      },
    };
  }),
});
