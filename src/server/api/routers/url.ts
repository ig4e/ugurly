import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import ShortUniqueId from "short-unique-id";
import { z } from "zod";
import { getUrl } from "~/lib/get-url";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { MAX, MIN } from "~/server/config";

const urlQueryType = z.enum(["slug", "id"]);

const urlFields = z.object({
  slug: z.string().min(MIN.url.slug.length).max(MAX.url.slug.length).optional(),
  url: z.string().min(MIN.url.length).max(MAX.url.length).url(),
  password: z
    .string()
    .min(MIN.url.passwordLength)
    .max(MAX.url.passwordLength)
    .optional(),
  maxClicks: z.number().int().optional(),
});

export const urlRouter = createTRPCRouter({
  create: publicProcedure.input(urlFields).mutation(async ({ ctx, input }) => {
    const { randomUUID } = new ShortUniqueId({ length: 10 });
    const isAuthed = !!ctx.session?.user;
    const passwordHash = input.password
      ? await bcrypt
          .genSalt()
          .then((salt) => bcrypt.hash(input.password!, salt))
      : undefined;

    const url = await ctx.db.url.create({
      data: {
        id: randomUUID(),
        slug: input.slug,
        url: input.url,
        password: passwordHash,
        maxClicks: input.maxClicks,
        createdBy: isAuthed
          ? { connect: { id: ctx.session?.user.id } }
          : undefined,
      },
    });

    return { ...url, shortUrl: getUrl(url) };
  }),

  edit: protectedProcedure
    .input(
      urlFields.extend({
        id: z.string().min(MIN.url.id),
        password: z
          .string()
          .min(MIN.url.passwordLength)
          .max(MAX.url.passwordLength)
          .nullable()
          .optional(),
        maxClicks: z.number().int().nullable().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const url = await ctx.db.url.findUnique({
        where: {
          id: input.id,
          createdById: ctx.session.user.id,
        },
      });

      if (!url) throw new TRPCError({ code: "NOT_FOUND" });

      const didPasswordChange = input.password
        ? input.password !== url.password
        : false;

      return ctx.db.url.update({
        where: {
          id: input.id,
          createdById: ctx.session.user.id,
        },
        data: {
          slug: input.slug,
          url: input.url,
          password: input.password
            ? didPasswordChange
              ? await bcrypt
                  .genSalt()
                  .then((salt) => bcrypt.hash(input.password!, salt))
              : url.password
            : { set: null },
          maxClicks: input.maxClicks,
        },
      });
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string().min(MIN.url.id),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.url.delete({
        where: {
          id: input.id,
          createdById: ctx.session.user.id,
        },
      });
    }),

  getPublic: publicProcedure
    .input(
      z.discriminatedUnion("type", [
        z.object({
          type: z.literal(urlQueryType.enum.id),
          id: z.string().min(MIN.url.id),
          password: z.string().min(MIN.url.passwordLength).optional(),
        }),
        z.object({
          type: z.literal(urlQueryType.enum.slug),
          slug: z.string().min(MIN.url.slug.length),
          password: z.string().min(MIN.url.passwordLength).optional(),
        }),
      ]),
    )
    .mutation(async ({ ctx, input }) => {
      const url = await ctx.db.url.findUnique({
        where: {
          id: input.type === "id" ? input.id : undefined,
          slug: input.type === "slug" ? input.slug : undefined,
        },
      });

      if (!url) throw new TRPCError({ code: "NOT_FOUND" });

      const { password, ...urlData } = url;

      if (password) {
        if (!input.password) throw new TRPCError({ code: "UNAUTHORIZED" });
        const isMatch = await bcrypt.compare(input.password, password);
        if (!isMatch) throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return urlData;
    }),

  get: protectedProcedure
    .input(
      z.object({
        id: z.string().min(MIN.url.id),
      }),
    )
    .query(async ({ ctx, input }) => {
      const url = await ctx.db.url.findUnique({
        where: {
          id: input.id,
          createdById: ctx.session.user.id,
        },
      });

      if (!url) throw new TRPCError({ code: "NOT_FOUND" });

      return url;
    }),

  getUrls: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        sortBy: z.enum(["desc", "asc"]).default("desc"),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;
      const items = await ctx.db.url.findMany({
        take: limit + 1,
        where: {
          createdById: ctx.session.user.id,
        },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: input.sortBy },
      });

      let nextCursor: typeof cursor | undefined = undefined;

      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }

      return {
        items,
        nextCursor,
      };
    }),
});
