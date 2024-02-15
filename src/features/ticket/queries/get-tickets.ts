import { prisma } from '@/services/prisma';

export const getTickets = async () => {
  return await prisma.ticket.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};
