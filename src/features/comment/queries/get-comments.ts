'use server';

import { getAuth } from '@/features/auth/queries/get-auth';
import { prisma } from '@/services/prisma';

const PAGE_SIZE = 2;

export const getComments = async (
  ticketId: string,
  offset: number
) => {
  const { user } = await getAuth();

  const [count, comments] = await prisma.$transaction([
    prisma.comment.count({
      where: {
        ticketId,
      },
    }),
    prisma.comment.findMany({
      where: {
        ticketId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: PAGE_SIZE,
      skip: offset,
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    }),
  ]);

  console.log(
    count > offset + comments.length,
    count,
    offset,
    comments.length
  );

  return {
    metadata: {
      total: count,
      hasNextPage: count > offset + comments.length,
    },
    comments: comments.map((comment) => ({
      ...comment,
      isOwner: comment.userId === user?.id,
    })),
  };
};
