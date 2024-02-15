import { prisma } from '@/services/prisma';

export const getTicket = async (id: string) => {
  return await prisma.ticket.findUniqueOrThrow({
    where: {
      id,
    },
  });
};
