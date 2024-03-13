import { prisma } from '@/lib/prisma';

export const getTicket = async (id: string) => {
  return await prisma.ticket.findUniqueOrThrow({
    where: {
      id,
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
