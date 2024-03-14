'use server';

import { prisma } from '@/lib/prisma';
import { getAuth } from '@/features/auth/queries/get-auth';
import { isOwner } from '@/features/auth/utils/is-owner';

export const getComments = async (
  ticketId: string,
  { skip, take }: { skip: number; take: number }
) => {
  const { user } = await getAuth();

  const where = {
    ticketId,
  };

  const [comments, count] = await prisma.$transaction([
    prisma.comment.findMany({
      where,
      skip,
      take,
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.comment.count({
      where,
    }),
  ]);

  return {
    list: comments.map((comment) => ({
      ...comment,
      isOwner: isOwner(user, comment),
    })),
    metadata: {
      hasNextPage: count > skip + take,
    },
  };
};
