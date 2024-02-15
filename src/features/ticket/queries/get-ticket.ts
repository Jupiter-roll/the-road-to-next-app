import prisma from '@/services/prisma';

export const getTicket = async (id: string) => {
  return prisma.ticket.findUniqueOrThrow({
    where: {
      id,
    },
  });
};
