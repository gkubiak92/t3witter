import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

export const likeRouter = createTRPCRouter({
  getLikes: publicProcedure
    .input(
      z.object({
        tweetId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { prisma } = ctx;
      const { tweetId } = input;
      return prisma.like.findMany({
        where: {
          tweetId,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });
    }),

  like: protectedProcedure
    .input(
      z.object({
        tweetId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { prisma, session } = ctx;
      const { tweetId } = input;
      const { user } = session;
      return prisma.like.create({
        data: {
          tweet: {
            connect: {
              id: tweetId,
            },
          },
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    }),

  unlike: protectedProcedure
    .input(
      z.object({
        tweetId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { prisma, session } = ctx;
      const { tweetId } = input;
      const { user } = session;

      return prisma.like.delete({
        where: {
          tweetId_userId: {
            tweetId,
            userId: user.id,
          },
        },
      });
    }),
});
