"use server";

import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";

export const getComments = async (ticketId: string, cursor?: number) => {
  const { user } = await getAuth();

  const where = {
    ticketId,
    createdAt: {
      lt: cursor ? new Date(cursor) : undefined,
    },
  };

  const take = 2;
  const skip = 0;

  let [comments, count] = await prisma.$transaction([
    prisma.comment.findMany({
      where,
      skip,
      take: take + 1,
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.comment.count({
      where,
    }),
  ]);

  const hasNextPage = comments.length > take;
  comments = hasNextPage ? comments.slice(0, -1) : comments;

  return {
    list: comments.map((comment) => ({
      ...comment,
      isOwner: isOwner(user, comment),
    })),
    metadata: {
      count,
      hasNextPage,
      cursor: comments.at(-1)?.createdAt.valueOf(),
    },
  };
};
