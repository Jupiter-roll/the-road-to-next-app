import { prisma } from '@/lib/prisma';

export const getTickets = async (
  userId: string | undefined,
  search: string
) => {
  return await prisma.ticket.findMany({
    where: {
      userId,
      title: {
        contains: search,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
};
