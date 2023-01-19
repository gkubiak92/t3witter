import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { tweetSchema } from "../../../components/newTweetForm/NewTweetForm";
import { z } from "zod";

export const tweetRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        cursor: z.string().nullish(),
        limit: z.number().min(1).max(100).default(10),
      })
    )
    .query(async ({ input, ctx }) => {
      const { prisma } = ctx;
      const { cursor, limit } = input;

      return prisma.tweet.findMany({
        cursor: cursor ? { id: cursor } : undefined,
        take: limit + 1,
        orderBy: { createdAt: "desc" },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });
    }),
  create: protectedProcedure
    .input(tweetSchema)
    .mutation(async ({ input, ctx }) => {
      const { prisma, session } = ctx;

      const { text } = input;

      return prisma.tweet.create({
        data: {
          text,
          author: {
            connect: {
              id: session.user.id,
            },
          },
        },
      });
    }),
});
