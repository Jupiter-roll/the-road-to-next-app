import { prisma } from '@/services/prisma';

export const getComments = async (ticketId: string) => {
  return await prisma.comment.findMany({
    where: {
      ticketId,
    },
    include: {
      user: true,
    },
  });
};
