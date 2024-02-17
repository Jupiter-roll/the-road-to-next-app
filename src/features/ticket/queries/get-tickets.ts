import { prisma } from '@/services/prisma';

export const getTickets = async (userId: string | undefined) => {
  return await prisma.ticket.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};
