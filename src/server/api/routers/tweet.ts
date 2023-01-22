import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { tweetSchema } from "../../../components/newTweetForm/NewTweetForm";
import { z } from "zod";

export const tweetRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        cursor: z.string().nullish(),
        limit: z.number().min(1).max(100).default(10),
        userId: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { prisma } = ctx;
      const { cursor, limit, userId } = input;

      const tweets = await prisma.tweet.findMany({
        cursor: cursor ? { id: cursor } : undefined,
        take: limit + 1,
        where: {
          authorId: userId,
        },
        orderBy: { createdAt: "desc" },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          likes: {
            select: {
              id: true,
              user: true,
            },
          },
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (tweets.length > limit) {
        const nextItem = tweets.pop() as (typeof tweets)[number];
        nextCursor = nextItem.id;
      }

      return {
        tweets,
        nextCursor,
      };
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
